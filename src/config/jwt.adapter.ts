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

  static verifyToken(token: string): any {
    throw new Error('not implemented');
  }
}
