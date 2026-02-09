import { Router } from "express";
import { checkUserLogin } from "../../middleware/checkLogin";
import {
  validationHandler,
  withErrorHandling,
} from "../../middleware/errorHandler";
import { getLoginUserInfo, updateLoginUser } from "./user.controller";
import { updateUserValidator } from "./user.validator";

const router = Router();

// Get current user's profile
router.get("/me", checkUserLogin, getLoginUserInfo);

router.patch(
  "/me",
  updateUserValidator,
  validationHandler,
  checkUserLogin,
  withErrorHandling(updateLoginUser),
);

export default router;
