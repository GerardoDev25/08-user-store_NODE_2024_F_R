import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { ProductController } from './controller';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    // const categoryService = new CategoryService();
    const controller = new ProductController();

    router.get('/', controller.getProduct);

    router.post('/', [AuthMiddleware.validateJwt], controller.createProduct);

    return router;
  }
}
