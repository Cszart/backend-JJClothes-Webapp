import * as mongoose from 'mongoose';
export const Tag_Schema = new mongoose.Schema({
  title: { type: String, required: true },
}
export class Tag_DATA extends mongoose.Document {
  id?: string;
  title: string;
}