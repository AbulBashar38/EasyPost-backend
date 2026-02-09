import { Router } from "express";
import { checkUserLogin } from "../../middleware/checkLogin";
import {
  validationHandler,
  withErrorHandling,
} from "../../middleware/errorHandler";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "./post.controller";
import {
  createPostValidator,
  postIdValidator,
  updatePostValidator,
} from "./post.validator";

const router = Router();

router.post(
  "/",
  checkUserLogin,
  createPostValidator,
  validationHandler,
  withErrorHandling(createPost),
);

router.get("/", checkUserLogin, withErrorHandling(getAllPosts));

router.get(
  "/:postId",
  checkUserLogin,
  postIdValidator,
  validationHandler,
  withErrorHandling(getPostById),
);

router.patch(
  "/:postId",
  checkUserLogin,
  updatePostValidator,
  validationHandler,
  withErrorHandling(updatePost),
);

router.delete(
  "/:postId",
  checkUserLogin,
  postIdValidator,
  validationHandler,
  withErrorHandling(deletePost),
);

export default router;
