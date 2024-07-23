import { Request, Response, NextFunction } from 'express';

export class TypeMiddleware {
  static validTypes = (validTypes: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const type = req.url.split('/').at(2) ?? '';

      console.log(type);

      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: `invalid type: ${type}, must be one of ${validTypes.join(
            ', '
          )}`,
        });
      }

      next();
    };
  };
}
