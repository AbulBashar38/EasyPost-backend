import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  default as createError,
  default as createHttpError,
} from "http-errors";

// 404 not found handler
function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res
    .status(err.status || 500)
    .json({ message: err.message, data: err.data, errors: err.errors });
}

const validationHandler = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    // console.log(Object.keys(mappedErrors));
    next();
  } else {
    return next({
      status: 400,
      message: "Validation Failed!!!",
      errors: mappedErrors,
    });
  }
};

const withErrorHandling =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    return await Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(error);
      next(createHttpError(500, error.message));
    });
  };

export { errorHandler, notFoundHandler, validationHandler, withErrorHandling };
