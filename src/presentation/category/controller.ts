import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { CategoryService } from '../services/';
import { CreateCategoryDto } from '../../domain/dtos/category';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  public createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    return res.json(createCategoryDto);
  };

  public getCategory = async (req: Request, res: Response) => {
    return res.json({
      message: 'Category get successfully',
    });
  };
}
