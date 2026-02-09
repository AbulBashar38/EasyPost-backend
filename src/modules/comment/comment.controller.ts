import { Response } from "express";
import { AuthRequest } from "../../middleware/checkLogin";
import Comment from "../../models/Comment";
import Post from "../../models/Post";
import { decrementPostCounter } from "../../utils/counterUtils";

export const createComment = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = await Comment.create({
    userId,
    postId: post._id,
    content: req.body.content,
  });

  // Increment comment count atomically
  await Post.findByIdAndUpdate(
    post._id,
    { $inc: { commentsCount: 1 } },
    { new: true },
  );

  res.status(201).json({ message: "Comment added", comment });
};

export const getComments = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comments = await Comment.find({ postId: post._id })
    .sort({ createdAt: -1 })
    .populate("userId", "firstName lastName username profilePicture");

  res.json({ comments });
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  if (comment.userId.toString() !== userId)
    return res
      .status(403)
      .json({ message: "You can only delete your own comments" });

  // Decrement comment count safely (prevents going negative)
  await Promise.all([
    Comment.findByIdAndDelete(comment._id),
    decrementPostCounter(comment.postId, "commentsCount", 1),
  ]);

  res.json({ message: "Comment deleted" });
};
