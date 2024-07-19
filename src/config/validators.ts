import mongoose from 'mongoose';

export class Validators {
  constructor() {}
  static isMongoId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
}
