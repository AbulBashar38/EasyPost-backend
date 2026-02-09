import { Router } from "express";
import { checkUserLogin } from "../../middleware/checkLogin";
import {
  validationHandler,
  withErrorHandling,
} from "../../middleware/errorHandler";
import {
  createComment,
  deleteComment,
  getComments,
} from "./comment.controller";
import {
  commentPostIdValidator,
  createCommentValidator,
} from "./comment.validator";

const router = Router();

// POST /api/comments/:postId - Add a comment to a post
router.post(
  "/:postId",
  checkUserLogin,
  createCommentValidator,
  validationHandler,
  withErrorHandling(createComment),
);

// GET /api/comments/:postId - Get all comments for a post
router.get(
  "/:postId",
  checkUserLogin,
  commentPostIdValidator,
  validationHandler,
  withErrorHandling(getComments),
);

// DELETE /api/comments/:commentId - Delete own comment
router.delete("/:commentId", checkUserLogin, withErrorHandling(deleteComment));

export default router;
