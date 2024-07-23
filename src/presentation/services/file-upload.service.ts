import { UploadedFile } from 'express-fileupload';

import { CustomError } from '../../domain/errors';
import path from 'node:path';
import fs from 'node:fs';
import { Uuid } from '../../config/';

export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSimpleFile(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['jpg', 'jpeg', 'gif', 'png']
  ) {
    try {
      const fileExtension = file.mimetype.split('/').at(1) ?? '';

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid extension: ${fileExtension}, valid extensions ${validExtensions.join(
            ', '
          )}`
        );
      }

      const destination = path.resolve(__dirname, `../../../`, folder);
      this.checkFolder(destination);

      const fileName = `${this.uuid()}.${fileExtension}`;

      file.mv(`${destination}/${fileName}`);

      return { fileName };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadMultipleFile(
    file: UploadedFile[],
    folder: string = 'folders',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {}
}
