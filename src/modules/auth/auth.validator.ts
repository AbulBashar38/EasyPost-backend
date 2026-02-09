import { body } from "express-validator";

export const getUserRegisterValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
];
export const getUserLoginValidator = [
  body("email").isEmail(),
  body("password").exists(),
];
