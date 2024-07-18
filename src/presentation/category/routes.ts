import { Router } from 'express';
import { CategoryController } from './controller';
import { CategoryService } from '../services';
import { AuthMiddleware } from '../middlewares';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new CategoryService();
    const controller = new CategoryController(service);

    router.get('/', controller.getCategory);

    router.post('/', [AuthMiddleware.validateJwt], controller.createCategory);

    return router;
  }
}
