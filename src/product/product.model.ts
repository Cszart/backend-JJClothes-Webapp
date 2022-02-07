import * as mongoose from 'mongoose';

// Product
export const Product_Schema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: false },
  new_item: { type: Boolean, required: false },
  description: { type: String, required: true },
  composition: [{ type: String, required: false }],
  gallery: [{ type: String, required: false }],
  stock: { type: Number, required: true },

  // Relations
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});

export class Product_DTO extends mongoose.Document {
  title: string;
  price: number;
  discount?: number;
  new_item: boolean;
  description: string;
  composition: string[];
  gallery: string[];
  stock: number;

  // Relations
  category: string;
  tags: string[];
}

// Product item
export const Product_Item_Schema = new mongoose.Schema({
  quantity: { type: Number, required: true },

  // Relations
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

export class Product_Item_DTO extends mongoose.Document {
  quantity: number;

  // Relations
  product: string;
}
