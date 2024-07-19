import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { CategoryService } from '../services/';
import { CreateCategoryDto } from '../../domain/dtos/category';
import { PaginationDto } from '../../domain/dtos/shared';

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

    return this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(res, error));
  };

  public getCategory = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) {
      return res.status(400).json({ error });
    }

    return this.categoryService
      .getCategories(paginationDto!)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(res, error));
  };
}
