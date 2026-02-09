import { Router } from "express";
import { checkUserLogin } from "../../middleware/checkLogin";
import {
  validationHandler,
  withErrorHandling,
} from "../../middleware/errorHandler";
import { getLikes, toggleLike } from "./like.controller";
import { likePostIdValidator } from "./like.validator";

const router = Router();

// POST /api/likes/:postId - Toggle like on a post
router.post(
  "/:postId",
  checkUserLogin,
  likePostIdValidator,
  validationHandler,
  withErrorHandling(toggleLike),
);

// GET /api/likes/:postId - Get all likes for a post
router.get(
  "/:postId",
  checkUserLogin,
  likePostIdValidator,
  validationHandler,
  withErrorHandling(getLikes),
);

export default router;
