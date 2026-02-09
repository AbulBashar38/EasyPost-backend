import { body } from "express-validator";

export const updateUserValidator = [
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
];
