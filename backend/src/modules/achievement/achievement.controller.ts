import type { RequestHandler } from "express";
import { CreateAchivementSchema, UpdateAchivementSchema } from "./achivement.validation";
import { decodeToken } from "../../shared/utils/decode";
import { AppError } from "../../shared/errors/app.error";
import { createAchivement_service, updateAchivement_service } from "./achievement.service";

export const createAchivement_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const decoded = decodeToken(req.cookies.access_token);
    const data = CreateAchivementSchema.parse(req.body);
    const achivement= await createAchivement_service(decoded.id, data);

    res.status(201).json({
      status: "success",
      data: achivement,
    });
  } catch (error: any) {
    next(new AppError(error, 400));
  }
};

export const updateAchivement_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const decoded = decodeToken(req.cookies.access_token);
    const data = UpdateAchivementSchema.parse(req.body);
    const { id } = req.params;
    if(typeof id !== "string"){
      throw new AppError("Invalid achievement ID", 400);
    }
    const achivement= await updateAchivement_service(decoded.id, data,id);

    res.status(201).json({
      status: "success",
      data: achivement,
    });
  } catch (error: any) {
    next(new AppError(error, 400));
  }
};