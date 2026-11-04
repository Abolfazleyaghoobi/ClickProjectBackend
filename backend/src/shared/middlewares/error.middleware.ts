
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
      success: false,
      message: err.message,
    });
    return;
  }



  console.error(err);

  res.status(500).json({
    success: false,
    message: "خطای داخلی سرور",
  });
};
