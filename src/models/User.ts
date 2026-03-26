import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'user' | 'librarian' | 'seller' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: UserRole;
  subscriptionStatus: 'inactive' | 'active';
  subscriptionExpiry?: Date;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth
    image: { type: String },
    role: { 
      type: String, 
      enum: ['user', 'librarian', 'seller', 'admin'], 
      default: 'user' 
    },
    subscriptionStatus: { 
      type: String, 
      enum: ['inactive', 'active'], 
      default: 'inactive' 
    },
    subscriptionExpiry: { type: Date },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Force re-registering the model with the latest schema during development
if (mongoose.models && mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
