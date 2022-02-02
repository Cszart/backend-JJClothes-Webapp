import * as mongoose from 'mongoose';

export const Category_Schema = new mongoose.Schema({
  name: { type: String, required: true },
});

export class Category_DTO extends mongoose.Document {
  name: string;
}
