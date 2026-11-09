
import type { Request, Response } from "express";

export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: "لطفاً یک تصویر ارسال کنید",
    });
    return;
  }

  res.status(201).json({
    success: true,
    message: "تصویر با موفقیت آپلود شد",
    data: {
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
};
