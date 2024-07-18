import { Router } from 'express';
import { CategoryController } from './controller';
import { CategoryService } from '../services';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryService = new CategoryService();
    const categoryController = new CategoryController(categoryService);

    router.get('/', categoryController.getCategory);
    router.post('/', categoryController.createCategory);

    return router;
  }
}
