import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  constructor() {}
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, { dbName });
      return true;
    } catch (error) {
      console.error('mongo connection error');
      throw error;
    }
  }
}
