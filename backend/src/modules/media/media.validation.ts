
import type { Request, Response, NextFunction } from "express";
import { readFile, unlink } from "node:fs/promises";
import { AppError } from "../../shared/errors/app.error";


const isValidImage = (buffer: Buffer): boolean => {
  // WebP
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return true;
  }

  return false;
};

export const validateImageContent = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      next();
      return;
    }

    const buffer = await readFile(req.file.path);

    if (!isValidImage(buffer)) {
      await unlink(req.file.path);
      throw new AppError("Invalid image format", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
