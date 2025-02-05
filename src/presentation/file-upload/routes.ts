import { Router } from 'express';
import { UploadFileController } from './controller';
import {
  AuthMiddleware,
  FileUploadMiddleware,
  TypeMiddleware,
} from '../middlewares';
import { FileUploadService } from '../services';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new FileUploadService();
    const controller = new UploadFileController(service);

    router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validTypes(['users', 'products', 'categories']));

    router.post('/simple/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFile);

    return router;
  }
}
