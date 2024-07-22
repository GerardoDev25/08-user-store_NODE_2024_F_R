import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';

export class UploadFileController {
  // constructor(private readonly categoryService: CategoryService) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  public uploadFile = async (req: Request, res: Response) => {

    return res.json('uploadFile')
    
  };
  
  public uploadMultipleFile = async (req: Request, res: Response) => {
    return res.json('uploadMultipleFile')
  };
}
