
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
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    if (!files) {
      
      
      next();

      return;
    }

    const allFiles = [
      ...(files.avatar_url ?? []),
      ...(files.banner_url ?? []),
    ];

    for (const file of allFiles) {
      const buffer = await readFile(file.path);

      if (!isValidImage(buffer)) {
        await unlink(file.path);
        throw new AppError("Invalid image format", 400);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
