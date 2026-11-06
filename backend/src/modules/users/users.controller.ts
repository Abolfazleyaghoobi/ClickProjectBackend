import type { RequestHandler } from "express";
import { CreateUserSchema } from "./users.validataion";
import { AppError } from "../../shared/errors/app.error";
import { ZodError } from "zod";
import { createUser_service } from "./users.service";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import { generateToken } from "../../shared/utils/generateJWT";

export const register_controller: RequestHandler = async (req, res, next) => {
  try {
    const data = CreateUserSchema.parse(req.body);

    // create user
    const result = await createUser_service(data);

    // Generate token
    const token = generateToken({
      id: result.id,
    });

    // Send cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (err: any) {
    if (err instanceof ZodError) {
      const zodERR = err.issues.map((issue: any) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      throw new AppError("Validation failed", 400, { errors: zodERR });
    }

    return next(mapDatabaseError(err));
  }
};
