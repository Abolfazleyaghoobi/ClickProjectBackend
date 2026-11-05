
import type { ErrorRequestHandler } from "express";

import { AppError } from "../errors/app.error";

export const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  if (err instanceof AppError) {
  res.status(err.statusCode).json({
  message: err.message,
  ...(err.body && { body: err.body }),
});
    return;
  }



  console.error(err);

  res.status(500).json({
    success: false,
    message: "warning: something went wrong",
  });
};
