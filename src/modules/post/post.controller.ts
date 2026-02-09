import { Response } from "express";
import { AuthRequest } from "../../middleware/checkLogin";
import Comment from "../../models/Comment";
import Like from "../../models/Like";
import Post from "../../models/Post";

// Helper function to build post response with comments and isLiked
async function buildPostResponse(post: any, userId: string) {
  const [comments, isLiked] = await Promise.all([
    Comment.find({ postId: post._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "firstName lastName username profilePicture"),
    Like.findOne({ userId, postId: post._id }),
  ]);

  return {
    ...post.toObject(),
    comments,
    isLiked: !!isLiked,
  };
}

// ─── Post CRUD ───

export const createPost = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { content } = req.body;
  const post = await Post.create({ userId, content });
  res.status(201).json({ message: "Post created", post });
};

export const getAllPosts = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

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

  const postsWithDetails = await Promise.all(
    posts.map((post) => buildPostResponse(post, userId)),
  );

  res.json({ posts: postsWithDetails, total, page, limit });
};

export const getPostById = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const post = await Post.findById(req.params.postId).populate(
    "userId",
    "firstName lastName username profilePicture",
  );
  if (!post) return res.status(404).json({ message: "Post not found" });

  const postWithDetails = await buildPostResponse(post, userId);
  res.json({ post: postWithDetails });
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
