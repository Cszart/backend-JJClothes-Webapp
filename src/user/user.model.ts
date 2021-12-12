import * as mongoose from 'mongoose';

export const User_Schema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class User_DTO extends mongoose.Document {
  id?: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}
