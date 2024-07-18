import { Router } from 'express';
import { AuthRoutes } from './auth/';
import { CategoryRoutes } from './category/';
import { ProductRoutes } from './products/';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // * routes definition
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);

    return router;
  }
}
