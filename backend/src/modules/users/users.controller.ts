import type { RequestHandler } from "express";
import { CreateUserSchema } from "./users.validataion";
import { AppError } from "../../shared/errors/app.error";
import { ZodError } from "zod";
import { createUser_service } from "./users.service";

export const createUser_controller: RequestHandler =async  (req, res, next) => {
  try {
    const data = CreateUserSchema.parse(req.body);
    const result= await createUser_service(data);
    res.send(result);


  } catch (err: any) {
    if (err instanceof ZodError) {
      const zodERR = err.issues.map((issue: any) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      throw new AppError("Validation failed", 400, { errors: zodERR });
    }

    return next(err);
  }
};
