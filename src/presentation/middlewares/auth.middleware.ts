import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain/entities/user.entity';

export class AuthMiddleware {
  static validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header('Authorization');

    if (!authorization) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'invalid Bearer Token' });
    }

    const token = authorization.split(' ').at(1) ?? '';

    try {
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token);

      if (!payload) {
        return res.status(401).json({ error: 'Invalid Token' });
      }

      const user = await UserModel.findById(payload.id);

      if (!user) {
        return res.status(401).json({ error: 'Invalid token - user' });
      }

      // todo validate is the user is available

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'internal server error' });
    }
  };
}
