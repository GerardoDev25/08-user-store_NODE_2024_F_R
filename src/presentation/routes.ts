import { Router } from 'express';
import { AuthRoutes } from './auth/';
import { CategoryRoutes } from './category/';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // * routes definition
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);

    return router;
  }
}
