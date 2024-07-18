import jwt from 'jsonwebtoken';
import { envs } from './envs';

const jwt_seed = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(
    payload: any,
    duration: string = '2h'
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, jwt_seed, { expiresIn: duration }, (err, token) => {
        if (err) return reject(null);
        return resolve(token!);
      });
    });
  }

  static verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwt_seed, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded as T);
      });
    });
  }
}
