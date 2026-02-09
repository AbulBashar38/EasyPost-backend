import { Router } from "express";
import {
  validationHandler,
  withErrorHandling,
} from "../../middleware/errorHandler";
import { loginController, registerUserController } from "./auth.controller";
import {
  getUserLoginValidator,
  getUserRegisterValidator,
} from "./auth.validator";

const router = Router();

// Register
router.post(
  "/register",
  getUserRegisterValidator,
  validationHandler,
  withErrorHandling(registerUserController),
);

// Login
router.post(
  "/login",
  getUserLoginValidator,
  validationHandler,
  withErrorHandling(loginController),
);

export default router;
