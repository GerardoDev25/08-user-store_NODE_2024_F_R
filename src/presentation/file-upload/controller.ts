import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { FileUploadService } from '../services';
import { UploadedFile } from 'express-fileupload';

export class UploadFileController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  public uploadFile = async (req: Request, res: Response) => {
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: 'no file were selected' });
    }
    const file = files.file as UploadedFile;

    if (!file) {
      return res
        .status(400)
        .json({ error: 'no resource with name file was found in the request' });
    }

    return await this.fileUploadService
      .uploadSimpleFile(file)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(res, error));

    return res.json('uploadFile');
  };

  public uploadMultipleFile = async (req: Request, res: Response) => {
    return res.json('uploadMultipleFile');
  };
}
