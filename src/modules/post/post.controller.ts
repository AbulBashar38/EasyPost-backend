import { Response } from "express";
import { AuthRequest } from "../../middleware/checkLogin";
import Comment from "../../models/Comment";
import Like from "../../models/Like";
import Post from "../../models/Post";

// ─── Post CRUD ───

export const createPost = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { content } = req.body;
  const post = await Post.create({ userId, content });
  res.status(201).json({ message: "Post created", post });
};

export const getAllPosts = async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "firstName lastName username profilePicture"),
    Post.countDocuments(),
  ]);

  res.json({ posts, total, page, limit });
};

export const getPostById = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.postId).populate(
    "userId",
    "firstName lastName username profilePicture",
  );
  if (!post) return res.status(404).json({ message: "Post not found" });

  res.json({ post });
};

export const updatePost = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.userId.toString() !== userId)
    return res
      .status(403)
      .json({ message: "You can only update your own posts" });

  post.content = req.body.content;
  await post.save();
  res.json({ message: "Post updated", post });
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.userId.toString() !== userId)
    return res
      .status(403)
      .json({ message: "You can only delete your own posts" });

  await Promise.all([
    Post.findByIdAndDelete(post._id),
    Comment.deleteMany({ postId: post._id }),
    Like.deleteMany({ postId: post._id }),
  ]);

  res.json({ message: "Post deleted" });
};
