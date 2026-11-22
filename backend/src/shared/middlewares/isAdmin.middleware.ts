import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../configs/env";
import { AppError } from "../errors/app.error";
import { adminRepository } from "../../modules/admin/admin.repository";
import { AdminRole } from "../../modules/admin/entity/admin.entity";

export const authenticateAdmin: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.admin_token;

    const isVerify = jwt.verify(token, env.JWT_SECRET);
    if (typeof isVerify === "string" || !isVerify.id) {
      return next(new AppError("token is invalid", 401));
    }
    return next();
  } catch (error) {
    throw new AppError("jwt expired or invalid", 401);
  }
};

export const isAccessAdmin: RequestHandler = async (req, res, next) => {
  const decode = jwt.decode(req.cookies.admin_token);
  if (!decode || typeof decode === "string") {
    throw new AppError("Invalid token", 401);
  }

  const isAdminMain = await adminRepository.findOne({
    where: {
      id: decode.id,
    },
  });
  if (isAdminMain?.role !== AdminRole.MENTOR_MANAGER) {
    return next(new AppError("you are not admin main ", 403));
  }
  return next();
};
