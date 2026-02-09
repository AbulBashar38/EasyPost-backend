import { body, param } from "express-validator";

export const commentPostIdValidator = [
  param("postId").isMongoId().withMessage("Invalid post ID"),
];

export const createCommentValidator = [
  param("postId").isMongoId().withMessage("Invalid post ID"),
  body("content").notEmpty().withMessage("Content is required"),
];
