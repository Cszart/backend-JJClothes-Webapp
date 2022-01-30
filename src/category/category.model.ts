import * as mongoose from 'mongoose';

export const category_Schema = new mongoose.Schema({
type: { type: String, required: true },
}

export class Product_DATA extends mongoose.Document {
    id?: string;
  title: string;  
}