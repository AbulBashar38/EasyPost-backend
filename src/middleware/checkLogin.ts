import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export interface AuthRequest extends Request {
  user?: any;
}

export const checkUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next({
      status: 401,
      message: "Authorization failed",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET) as any;

    if (!decodedData) {
      return next({
        status: 401,
        message: "Authorization failed",
      });
    }

    (req as AuthRequest).user = decodedData;
    next();
  } catch (err) {
    return next({
      status: 401,
      message: "Authorization failed",
    });
  }
};
