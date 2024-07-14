import { UserModel } from '../../data';
import { RegisterUserDto } from '../../domain/dtos/auth/';
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities/';
import { bcryptAdapter } from '../../config';
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

      // todo generate jwt to auth user
      // todo send confirmation email

      await user.save();
      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: { ...userEntity }, token: 'abc' };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }

    // return 'all ok';
  }
}
