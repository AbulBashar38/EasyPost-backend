import { Router } from "express";
import authRouter from "../modules/auth/auth.router";
import usersRouter from "../modules/user/user.router";
const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/users", usersRouter);

export default router;
