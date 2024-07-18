import { CreateCategoryDto } from '../../domain/dtos/category/';
import { UserEntity } from '../../domain/entities';
import { CategoryModel } from '../../data/mongo/models/';
import { CustomError } from '../../domain/errors';
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

  async getCategories() {
    try {
      const categories = await CategoryModel.find();

      const categoriesMapped = categories.map((category) => {
        const { id, name, available } = category;
        return { id, name, available };
      });

      return categoriesMapped;
    } catch (error) {
      throw CustomError.internalServerError(`internal server error`);
    }
  }
}
