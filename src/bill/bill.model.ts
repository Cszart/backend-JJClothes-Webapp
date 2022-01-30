import * as mongoose from 'mongoose';
export const Bill_Schema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true }
  phoneNumber: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  stateProvidence: { type: String, required: true }, 
  city: { type: String, required: true }, 
  courier: { type: String, required: true }, 
}

export class Bill_DATA extends mongoose.Document {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  country: string;
  stateProvidence: string;
  city: string;
  zipCode: string;
  courier: string;
}