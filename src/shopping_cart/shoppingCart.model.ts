import * as mongoose from 'mongoose';
import {
  Product_Item_DTO,
  Product_Item_Schema,
} from 'src/product/product.model';

// ShoppingCart
export const ShoppingCart_Schema = new mongoose.Schema({
  subtotal: { type: Number, required: true, default: 0 },

  // Relations
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      type: Product_Item_Schema,
      default: [],
    },
  ],
});

export class ShoppingCart_DTO extends mongoose.Document {
  subtotal: number;

  // Relations
  user: string;
  items: Product_Item_DTO[];
}
