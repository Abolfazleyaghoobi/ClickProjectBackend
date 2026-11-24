import { RequestHandler } from "express";
import { AppError } from "../../shared/errors/app.error";
import { createCourse_servise, deleteCourse_service, getAllCourse_service, updateCourse_service } from "./courses.service";
import { createCourseSchema, updateCourseSchema } from "./courses.validation";
import { ZodError } from "zod";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";

export const createCourse_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const image = files?.image_url?.[0];

    if (!image) {
      throw new AppError("تصویر ارسال نشده است", 400);
    }
    const data = createCourseSchema.parse(req.body);

    const result = await createCourse_servise(data, files);
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



export const updateCourse_controller: RequestHandler = async (req, res, next) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const id = Number(req.params.id);
  
    const data = updateCourseSchema.parse(req.body);
    const result = await updateCourse_service(id,data, files);
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



export const deleteCourse_controller: RequestHandler = async (req, res,next) => {
  try {
    const id = Number(req.params.id);
  
    const result = await deleteCourse_service(id);
    res.status(200).json({ message: result });
  } catch (error:any) {
  throw new AppError(error, 500);
    
  }
};



export const getAllCourse_controller: RequestHandler = async (req, res) => {
  const resutl = await getAllCourse_service();
  res.status(200).json({ message:resutl });
};