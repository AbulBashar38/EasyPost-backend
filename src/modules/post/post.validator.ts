import { body, param } from "express-validator";

export const createPostValidator = [
  body("content").notEmpty().withMessage("Content is required"),
];

export const updatePostValidator = [
  param("postId").isMongoId().withMessage("Invalid post ID"),
  body("content").notEmpty().withMessage("Content is required"),
];

export const postIdValidator = [
  param("postId").isMongoId().withMessage("Invalid post ID"),
];
