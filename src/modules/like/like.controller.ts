import { Response } from "express";
import { AuthRequest } from "../../middleware/checkLogin";
import Like from "../../models/Like";
import Post from "../../models/Post";
import { decrementPostCounter } from "../../utils/counterUtils";

export const toggleLike = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const existing = await Like.findOne({ userId, postId: post._id });

  if (existing) {
    // Unlike: decrement count safely
    await Promise.all([
      Like.findByIdAndDelete(existing._id),
      decrementPostCounter(post._id, "likesCount", 1),
    ]);
    return res.json({ message: "Post unliked", liked: false });
  }

  // Like: increment count
  await Promise.all([
    Like.create({ userId, postId: post._id }),
    Post.findByIdAndUpdate(post._id, { $inc: { likesCount: 1 } }, { new: true }),
  ]);
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
