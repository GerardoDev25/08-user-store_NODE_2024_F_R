import { Router } from 'express';
import { AuthRoutes } from './auth/';
import { CategoryRoutes } from './category/';
import { ProductRoutes } from './products/';
import { FileUploadRoutes } from './file-upload';
import { ImageRoutes } from './images';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // * routes definition
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/upload', FileUploadRoutes.routes);
    router.use('/api/image', ImageRoutes.routes);

    return router;
  }
}
