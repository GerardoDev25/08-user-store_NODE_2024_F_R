import { Validators } from '../../../config/validators';
export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object;

    if (!name) return ['missing Name.', undefined];

    if (!user) return ['missing user.', undefined];
    if (!Validators.isMongoId(user))
      return ['invalid mongo user id.', undefined];

    if (!category) return ['missing category.', undefined];
    if (!Validators.isMongoId(category))
      return ['invalid mongo category id.', undefined];

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
