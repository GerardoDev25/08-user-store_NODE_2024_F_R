import { ProductModel } from '../../data/mongo/models';
import { CustomError } from '../../domain/errors';
import { PaginationDto } from '../../domain/dtos/shared';
import { CreateProductDto } from '../../domain/dtos/products';
export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (productExists) {
      throw CustomError.badRequest('Product already exists');
    }

    try {
      const product = await ProductModel.create(createProductDto);
      await product.save();
      return product;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getProduct(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          // .populate('user', 'name email')
          .populate('user')
          .populate('category'),
      ]);

      return {
        page,
        limit,
        total,
        next: `/api/products?page=${page}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products,
      };
    } catch (error) {
      throw CustomError.internalServerError(`internal server error`);
    }
  }
}
