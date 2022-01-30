import * as mongoose from 'mongoose';

export const Order_Schema = new mongoose.Schema({
  order_number: { type: String, required: true },
  purchase_date: { type: String, required: true },
  shipping_cost: { type: Number, required: true },
  package_cost: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  bill_info: { type: Bill_DATA, required: true },
  payment_info: { type: Payment_DATA, required: true },
  items: { type: Product_item_DATA[], required: true },
}

export class Order_DATA extends mongoose.Document {
  id?: string;
  order_number: string;
  purchase_date: string;
  delivery_time: string;
  shipping_cost: number;
  package_cost: number;
  subtotal: number;
  bill_info: Bill_DATA;
  payment_info: Payment_DATA;
  items: Product_item_DATA[];
}