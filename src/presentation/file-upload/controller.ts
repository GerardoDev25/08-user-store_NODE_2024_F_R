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
    const { type } = req.params;

    const file = req.body.files.at(0) as UploadedFile;

    if (!file) {
      return res
        .status(400)
        .json({ error: 'no resource with name file was found in the request' });
    }

    return await this.fileUploadService
      .uploadSimpleFile(file, `uploads/${type}`)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(res, error));
  };

  public uploadMultipleFile = async (req: Request, res: Response) => {
    const { type } = req.params;
    const files = req.body.files as UploadedFile[];

    if (!files) {
      return res
        .status(400)
        .json({ error: 'no resource with name file was found in the request' });
    }

    return await this.fileUploadService
      .uploadMultipleFile(files, `uploads/${type}`)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(res, error));
  };
}
