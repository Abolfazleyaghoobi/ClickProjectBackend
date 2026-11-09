
import type { Request, RequestHandler, Response } from "express";
import { decodeToken } from "../../shared/utils/decode";
import { AppError } from "../../shared/errors/app.error";
import { updateProfileIMG_service } from "./media.service";

export const uploadImage:RequestHandler =async (req, res) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  if (!files) {
    res.status(400).json({
      success: false,
      message: "لطفاً یک تصویر ارسال کنید",
    });
    return;
  }
  const resutlDecode=decodeToken(req.cookies.access_token)
  if(!resutlDecode){
    throw new AppError("token is not valid", 401)
  }
  const resutl= await updateProfileIMG_service(resutlDecode.id,files)
  res.status(201).json({
    success: true,
    message: resutl.message
  
  });
};
