import { Router } from "express";
import authRouter from "../modules/auth/auth.router";
import commentRouter from "../modules/comment/comment.router";
import likeRouter from "../modules/like/like.router";
import postRouter from "../modules/post/post.router";
import usersRouter from "../modules/user/user.router";
const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/users", usersRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);
router.use("/api/likes", likeRouter);

export default router;
