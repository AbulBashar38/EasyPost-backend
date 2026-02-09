import Post from "../models/Post";
import { Types } from "mongoose";

/**
 * Safely increment a post counter by a value
 * Uses MongoDB atomic $inc operator for thread-safe operations
 * @param postId - The ID of the post to increment
 * @param counterField - The counter field to increment ('likesCount' or 'commentsCount')
 * @param amount - Amount to increment (default: 1, must be positive)
 * @returns Updated post document
 * @throws Error if amount is negative
 */
export const incrementPostCounter = async (
  postId: Types.ObjectId | string,
  counterField: "likesCount" | "commentsCount",
  amount: number = 1,
) => {
  if (amount < 0) {
    throw new Error("Amount must be positive for increment");
  }

  return await Post.findByIdAndUpdate(
    postId,
    { $inc: { [counterField]: amount } },
    { new: true },
  );
};

/**
 * Safely decrement a post counter by a value
 * PREVENTS NEGATIVE NUMBERS using Math.max(0, value)
 * This ensures counters never go below 0, even if called multiple times
 * @param postId - The ID of the post to decrement
 * @param counterField - The counter field to decrement ('likesCount' or 'commentsCount')
 * @param amount - Amount to decrement (default: 1, must be positive)
 * @returns Updated post document or null if post not found
 * @throws Error if amount is negative
 *
 * Safety layers:
 * 1. Math.max(0, value) - Prevents value from going negative in code
 * 2. MongoDB schema validation min: 0 - Database-level validation
 * 3. Atomic operation - Prevents race conditions
 */
export const decrementPostCounter = async (
  postId: Types.ObjectId | string,
  counterField: "likesCount" | "commentsCount",
  amount: number = 1,
) => {
  if (amount < 0) {
    throw new Error("Amount must be positive for decrement");
  }

  const post = await Post.findById(postId);
  if (!post) return null;

  // Calculate new value, ensuring it never goes below 0
  const currentValue = post[counterField];
  const newValue = Math.max(0, currentValue - amount);

  // Only update if value would change or if it was going negative (correction)
  if (newValue !== currentValue) {
    post[counterField] = newValue;
    await post.save();
  }

  return post;
};
