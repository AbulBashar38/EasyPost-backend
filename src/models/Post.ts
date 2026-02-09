import { Document, model, Schema, Types } from "mongoose";

export interface IPost extends Document {
  userId: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 2200, trim: true },
  },
  { timestamps: true },
);

PostSchema.index({ userId: 1, createdAt: -1 });

export default model<IPost>("Post", PostSchema);
