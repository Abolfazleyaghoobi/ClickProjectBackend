import { RequestHandler } from "express";
import { AppError } from "../../shared/errors/app.error";
import {
  createCourse_servise,
  deleteCourse_service,
  getAllCourse_service,
  getCourseById_service,
  updateCourse_service,
} from "./courses.service";
import { createCourseSchema, updateCourseSchema } from "./courses.validation";
import { ZodError } from "zod";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import {
  deleteStep_service,
  deleteLink_service,
  deleteResearch_service,
  deleteConference_service,
  deleteImage_service,
} from "./courses.service";

export const createCourse_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const files = req.files as Express.Multer.File[];

    const courseImage = files.find(
      (file) => file.fieldname === "image_url",
    );

    if (!courseImage) {
      throw new AppError("تصویر دوره ارسال نشده است", 400);
    }

    let parsedSteps;

    try {
      parsedSteps = JSON.parse(req.body.steps || "[]");
    } catch {
      throw new AppError("ساختار اطلاعات Steps معتبر نیست", 400);
    }

    const body = {
      ...req.body,
      steps: parsedSteps,
    };

    const data = createCourseSchema.parse(body);

    const result = await createCourse_servise(data, files);

    res.status(201).json({
      message: result,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      const zodERR = err.issues.map((issue: any) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(
        new AppError("Validation failed", 400, {
          errors: zodERR,
        }),
      );
    }

    return next(mapDatabaseError(err));
  }
};

export const updateCourse_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const files = req.files as Express.Multer.File[];


    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("شناسه دوره معتبر نیست", 400);
    }

    let parsedSteps;

    try {
      parsedSteps = req.body.steps
        ? JSON.parse(req.body.steps)
        : undefined;
    } catch {
      throw new AppError("ساختار اطلاعات Steps معتبر نیست", 400);
    }

    const body = {
      ...req.body,
      ...(parsedSteps !== undefined && { steps: parsedSteps }),
    };

  const hasFiles = files.length > 0;
const hasBodyData = Object.keys(body).length > 0;

if (!hasFiles && !hasBodyData) {
  throw new AppError(
    "حداقل یک فیلد یا تصویر برای ویرایش ارسال کنید",
    400,
  );
}

const data = updateCourseSchema.parse(body);

    const result = await updateCourse_service(id, data, files);

    res.status(200).json({
      message: result,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      const zodERR = err.issues.map((issue: any) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(
        new AppError("Validation failed", 400, {
          errors: zodERR,
        }),
      );
    }

    return next(mapDatabaseError(err));
  }
};

export const deleteCourse_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid course ID", 400);
    }

    const result = await deleteCourse_service(id);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
export const getAllCourse_controller: RequestHandler = async (req, res) => {
  const resutl = await getAllCourse_service();
  res.status(200).json({ message: resutl });
};



const getValidId = (value: string | string[]) => {
  if (Array.isArray(value)) {
    throw new AppError("Invalid ID", 400);
  }

  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Invalid ID", 400);
  }

  return id;
};
export const deleteStep_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const courseId = getValidId(req.params.courseId);
    const stepId = getValidId(req.params.stepId);

    const result = await deleteStep_service(courseId, stepId);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
export const deleteLink_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const stepId = getValidId(req.params.stepId);
    const linkId = getValidId(req.params.linkId);

    const result = await deleteLink_service(stepId, linkId);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
export const deleteResearch_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const stepId = getValidId(req.params.stepId);
    const researchId = getValidId(req.params.researchId);

    const result = await deleteResearch_service(stepId, researchId);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
export const deleteConference_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const stepId = getValidId(req.params.stepId);
    const conferenceId = getValidId(req.params.conferenceId);

    const result = await deleteConference_service(
      stepId,
      conferenceId,
    );

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
export const deleteImage_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const stepId = getValidId(req.params.stepId);
    const imageId = getValidId(req.params.imageId);

    const result = await deleteImage_service(stepId, imageId);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};

export const getCourseById_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid course ID", 400);
    }

    const result = await getCourseById_service(id);

    res.status(200).json({
      message: result,
    });
  } catch (error) {
    next(error);
  }
};