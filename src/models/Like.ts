import { Document, model, Schema, Types } from "mongoose";

export interface ILike extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
}

const LikeSchema = new Schema<ILike>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true },
);

// Ensure a user can only like a post once
LikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

export default model<ILike>("Like", LikeSchema);
