import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user';
import { AuthService } from '../services';

export class AuthController {
  // * di
  constructor(private readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json({ user }));
  };

  loginUser = (req: Request, res: Response) => {
    res.json('loginUser');
  };

  validateEmail = (req: Request, res: Response) => {
    res.json('validateEmailUser');
  };
}
