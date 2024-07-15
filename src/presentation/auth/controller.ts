import { Request, Response } from 'express';
import { LoginUserDto, RegisterUserDto } from '../../domain/dtos/auth/';
import { AuthService } from '../services';
import { CustomError } from '../../domain/errors';

export class AuthController {
  // * di
  constructor(private readonly authService: AuthService) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(res, error));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(res, error));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    res.json(token);

    // this.authService.validateEmail(token).then((user) => res.json(user));
    
  };
}
