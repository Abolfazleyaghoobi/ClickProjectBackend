
import type { RequestHandler } from "express";
import { AppError } from "../errors/app.error";

export const notFoundMiddleware: RequestHandler = (
  _req,
  _res,
  next,
) => {
  next(new AppError("not found rout", 404));
};
