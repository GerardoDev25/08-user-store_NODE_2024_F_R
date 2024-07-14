import { regularExps } from '../../../config/regular-exp';
export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Missing email', undefined];
    if (!regularExps.email.test(email))
      return ['email is not valid', undefined];
    if (!password) return ['Missing password', undefined];

    return [undefined, new LoginUserDto(email, password)];
  }
}
