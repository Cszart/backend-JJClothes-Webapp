import * as mongoose from 'mongoose';

export const Bank_Active_Schema = new mongoose.Schema({
  name: String,
});

export const Bank_Schema = new mongoose.Schema({
  transaction_number: Number,
  order: String,
  reason: String,
  amount: String,
  status: String,
  date: Date,
});

export class Bank_Active_DTO extends mongoose.Document {
  name: string;
}
export class Bank_DTO extends mongoose.Document {
  key: string;
}

export class Bank_BD_DTO extends mongoose.Document {
  transaction_number: number;
  order: string;
  reason: string;
  amount: string;
  status: string;
  date: Date;
}

export type Bank_Active_Type = {
  name: string;
};

export type Bank_Type = {
  order: string;
  reason: string;
  amount: string;
  status: string;
};

export enum Status_Transaction {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}
