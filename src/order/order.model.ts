import * as mongoose from 'mongoose';

// Product
import {
  Product_Item_DTO,
  Product_Item_Schema,
} from 'src/product/product.model';

// Bill
export const Bill_Schema = new mongoose.Schema({
  // User data
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },

  // direction
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  zip_code: { type: String, required: true },
});

export class Bill_DTO extends mongoose.Document {
  // User data
  fullName: string;
  email: string;
  phoneNumber: string;

  // direction
  state: string;
  city: string;
  street: string;
  zip_code: string;
}

// Payment
export const Payment_Schema = new mongoose.Schema({
  card_number: { type: String, required: true },
  security_digits: { type: String, required: true },
  expiring_date: { type: String, required: true },
});

export class Payment_DTO extends mongoose.Document {
  card_number: string;
  security_digits: string;
  expiring_date: string;
}

// Order
export const Order_Schema = new mongoose.Schema({
  purchase_date: { type: Date, required: false },
  shipping_cost: { type: Number, required: true, default: 0 },
  subtotal: { type: Number, required: false, default: 0 },

  // Relations
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  bill_info: {
    type: Bill_Schema,
  },

  payment_info: {
    type: Payment_Schema,
  },

  items: [
    {
      type: Product_Item_Schema,
      default: [],
    },
  ],
});

export class Order_DTO extends mongoose.Document {
  purchase_date: Date;
  shipping_cost: number;
  subtotal: number;

  // Relations
  user: string;
  bill_info: Bill_DTO;
  payment_info: Payment_DTO;
  items: Product_Item_DTO[];
}
