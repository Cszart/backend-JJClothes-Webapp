import * as mongoose from 'mongoose';

export const Tag_Schema = new mongoose.Schema({
  name: { type: String, required: true },
});

export class Tag_DTO extends mongoose.Document {
  name: string;
}
