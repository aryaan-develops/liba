import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  type: 'lend' | 'buy';
  image: string;
  price: number;
  category: string;
  description: string;
  sellerId: mongoose.Schema.Types.ObjectId;
  borrowerId?: mongoose.Schema.Types.ObjectId;
  dueDate?: Date;
  subscriberOnly: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    type: { type: String, enum: ['lend', 'buy'], required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String, required: true },
    description: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date },
    subscriberOnly: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
