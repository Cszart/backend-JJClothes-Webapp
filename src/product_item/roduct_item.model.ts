import * as mongoose from 'mongoose';

export const product_item_Schema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  product: { type: Product_DATA, required: true },
}

export class Product_item_DATA extends mongoose.Document {
  id?: string;
  quantity: number;
  product: product;
}