import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../configs/env";
import { AppError } from "../errors/app.error";

export const authenticate: RequestHandler = (req, res, next) => {

  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(new AppError("token is not found", 401));
    }
    const isVerify = jwt.verify(token, env.JWT_SECRET);
    if (typeof isVerify === "string" || !isVerify.id) {
      return next(new AppError("token is invalid", 401));
    }
    return next();
  } catch (error) {
    throw new AppError("jwt expired or invalid", 401);
  }
};
