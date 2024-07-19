import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { ProductController } from './controller';
import { ProductService } from '../services';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ProductService();
    const controller = new ProductController(service);

    router.get('/', controller.getProduct);

    router.post('/', [AuthMiddleware.validateJwt], controller.createProduct);

    return router;
  }
}
