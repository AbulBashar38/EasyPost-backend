import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default model<IUser>("User", UserSchema);
