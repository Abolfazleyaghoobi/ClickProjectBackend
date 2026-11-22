import { RequestHandler } from "express";
import { pathCreateSchema } from "./path.validation";
import { AppError } from "../../shared/errors/app.error";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import { ZodError } from "zod";
import { pathCreate_service } from "./path.service";

export const createPath_controller: RequestHandler = async (req, res, next) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const image = files?.image_url?.[0];

    if (!image) {
      throw new AppError("تصویر ارسال نشده است", 400);
    }
    const data = pathCreateSchema.parse(req.body);
    const result = await pathCreate_service(data, files);
    res.status(201).json({ message: result });
  } catch (err: any) {
  
    if (err instanceof ZodError) {
      const zodERR = err.issues.map((issue: any) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new AppError("Validation failed", 400, { errors: zodERR }));
    }

    return next(mapDatabaseError(err));
  }
};

export const getAllPaths_controller: RequestHandler = async (req, res) => {
  // TODO: get all paths
  res.status(200).json({ message: "getAllPaths_controller" });
};
