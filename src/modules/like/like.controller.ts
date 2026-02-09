import { Response } from "express";
import { AuthRequest } from "../../middleware/checkLogin";
import Like from "../../models/Like";
import Post from "../../models/Post";

export const toggleLike = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const existing = await Like.findOne({ userId, postId: post._id });

  if (existing) {
    await Like.findByIdAndDelete(existing._id);
    return res.json({ message: "Post unliked", liked: false });
  }

  await Like.create({ userId, postId: post._id });
  res.json({ message: "Post liked", liked: true });
};

export const getLikes = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const likes = await Like.find({ postId: post._id }).populate(
    "userId",
    "firstName lastName username profilePicture",
  );

  res.json({ likes, count: likes.length });
};
