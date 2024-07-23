import path from 'node:path';
import fs from 'node:fs';
import { Request, Response } from 'express';

export class ImageController {
  constructor() {}

  getImage = async (req: Request, res: Response) => {
    const { type = '', img = '' } = req.params;
    const imagePath = path.resolve(
      __dirname,
      `../../../uploads/${type}/${img}`
    );

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    return res.sendFile(imagePath);
  };
}
