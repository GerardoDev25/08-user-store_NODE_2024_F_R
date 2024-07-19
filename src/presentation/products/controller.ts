import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { PaginationDto } from '../../domain/dtos/shared';
import { CreateProductDto } from '../../domain/dtos/products/';
import { ProductService } from '../services';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  public createProduct = async (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(res, error));
  };

  public getProduct = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) {
      return res.status(400).json({ error });
    }

    return this.productService
      .getProduct(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((error) => this.handleError(res, error));
  };
}
