import { UserModel } from '../../data';
import { LoginUserDto, RegisterUserDto } from '../../domain/dtos/auth/';
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities/';
import { bcryptAdapter, JwtAdapter } from '../../config';
export class AuthService {
  constructor() {}
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

      // todo send confirmation email

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
}
