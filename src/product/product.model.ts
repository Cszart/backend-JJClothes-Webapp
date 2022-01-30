import * as mongoose from 'mongoose';

export const Product_Schema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: false },
  description: { type: String, required: true },
  warranty: { type: String, required: true },
  gallery: { type: String, required: true },
  stock: { type: Number, required: true },
})

export class Product_DATA extends mongoose.Document {
  id?: string;
  title: string;
  price: number;
  discount: number;
  description: string;
  warranty: string;
  gallery: string[];
  stock: number;
}