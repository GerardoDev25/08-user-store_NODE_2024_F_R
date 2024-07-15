import { UserModel } from '../../data';
import { LoginUserDto, RegisterUserDto } from '../../domain/dtos/auth/';
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities/';
import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { EmailService } from './email.service';

export class AuthService {
  constructor(private readonly emailService: EmailService) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) {
      throw CustomError.badRequest('Email already exist');
    }

    try {
      const user = await UserModel.create(registerUserDto);

      user.password = bcryptAdapter.hash(registerUserDto.password);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) {
        throw CustomError.internalServerError('Error while generating jwt');
      }

      await this.sendEmailValidationLink(user.email);

      await user.save();
      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: { ...userEntity }, token };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw CustomError.notFound('user not found');
    }

    const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      throw CustomError.badRequest('Invalid credentials');
    }

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) {
      throw CustomError.internalServerError('Error while generating jwt');
    }

    return { user: userEntity, token };
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });

    if (!token) {
      throw CustomError.internalServerError('Error getting token');
    }

    const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;

    const htmlBody = `
      <h1>Validate your account</h1>
      <p>Click in the following link to validate your email</p>
      <a href="${link}">validate your email:${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody,
    };
    const isSent = await this.emailService.sendEmail(options);

    if (!isSent) {
      throw CustomError.internalServerError('Error while sending email');
    }
    return true;
  };
}
