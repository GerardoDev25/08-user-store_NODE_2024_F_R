import { CreateCategoryDto } from '../../domain/dtos/category/';
import { UserEntity } from '../../domain/entities';
import { CategoryModel } from '../../data/mongo/models/';
import { CustomError } from '../../domain/errors';
import { PaginationDto } from '../../domain/dtos/shered';
export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExists) {
      throw CustomError.badRequest('Category already exists');
    }

    try {
      const category = await CategoryModel.create({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      const { id, name, available } = category;

      return { id, name, available };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getCategories(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    try {
      // const total = await CategoryModel.countDocuments();

      // const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit);

      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      const categoriesMapped = categories.map((category) => {
        const { id, name, available } = category;
        return { id, name, available };
      });

      return {
        page,
        limit,
        total,
        next: `/api/categories?page=${page}&limit=${limit}`,
        prev:
          page - 1 > 0
            ? `/api/categories?page=${page - 1}&limit=${limit}`
            : null,
        categories: categoriesMapped,
      };
    } catch (error) {
      throw CustomError.internalServerError(`internal server error`);
    }
  }
}
