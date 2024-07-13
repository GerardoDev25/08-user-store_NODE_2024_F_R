import { UserModel } from '../../data';
import { RegisterUserDto } from '../../domain/dtos/auth/';
import { CustomError } from '../../domain/errors';
export class AuthService {
  constructor() {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) {
      throw CustomError.badRequest('Email already exist');
    }

    return 'all ok';
  }
}
