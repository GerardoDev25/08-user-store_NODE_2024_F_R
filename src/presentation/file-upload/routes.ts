import { Router } from 'express';
import { UploadFileController } from './controller';
import { AuthMiddleware } from '../middlewares';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    // const service = new CategoryService();
    const controller = new UploadFileController();

    router.post('/simple/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFile);

    return router;
  }
}
