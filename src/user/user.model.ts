import * as mongoose from 'mongoose';
import {
  ShoppingCart_DTO,
  ShoppingCart_Schema,
} from 'src/shopping_cart/shoppingCart.model';

export const User_Schema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true, default: '123' },
  birth_date: { type: Date, required: true },
  rol: { type: String, required: true, default: 'natural' },

  // Relations
  shoppingCart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShoppingCart',
    required: false,
  },
});

export class User_DTO extends mongoose.Document {
  firstname: string;
  lastname: string;
  password: string;
  birth_date: Date;
  rol: string;

  // Relations
  shoppingCart: ShoppingCart_DTO;
}
