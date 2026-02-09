import { param } from "express-validator";

export const likePostIdValidator = [
  param("postId").isMongoId().withMessage("Invalid post ID"),
];
