import * as mongoose from 'mongoose';

export const Bank_Schema = new mongoose.Schema({
  order: String,
  reason: String,
  amount: String,
  status: String,
});

export class Bank_DTO extends mongoose.Document {
  key: string;
}

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
