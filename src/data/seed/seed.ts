import { envs } from '../../config';
import { CategoryModel, ProductModel, UserModel } from '../mongo/models';
import { MongoDatabase } from '../mongo/mongo-database';
import { seedData } from './data';

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number): number => {
  return Math.floor(Math.random() * x);
};

async function main() {
  // ? delete all
  await Promise.all([
    UserModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    ProductModel.deleteMany({}),
  ]);

  // ? create users
  const users = await UserModel.insertMany(seedData.users);

  // ? create categories
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: users[randomBetween0AndX(users.length - 1)].id,
    }))
  );

  // ? create products
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: users[randomBetween0AndX(users.length - 1)].id,
      category: categories[randomBetween0AndX(categories.length - 1)].id,
    }))
  );

  console.log({
    message: 'seed date executed successfully',
    users: users.length,
    categories: categories.length,
    products: products.length,
  });
}
