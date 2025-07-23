import { Schema, model, Document, Types } from 'mongoose';
import { ICategory } from './category';

export interface IBlog extends Document {
  title: string;
  description: string;
  images: string[];
  author: string;
  category: Types.ObjectId | ICategory;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  author: { type: String, required: true },
  category: { type: Types.ObjectId, ref: 'Category', required: true }
});

export default model<IBlog>('Blog', BlogSchema);
