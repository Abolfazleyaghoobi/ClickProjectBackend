import type { RequestHandler } from "express";
import { CreateUserSchema, LoginUserSchema } from "./users.validataion";
import { AppError } from "../../shared/errors/app.error";
import { string, ZodError } from "zod";
import {
  createUser_service,
  getInfo_servece,
  login_service,
} from "./users.service";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import { generateToken } from "../../shared/utils/generateJWT";
import jwt from "jsonwebtoken";
// register User

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

// Login User

export const login_controller: RequestHandler = async (req, res, next) => {
  const data = LoginUserSchema.parse(req.body);
  try {
    const result = await login_service(data);

    // Generate token
    const token = generateToken({
      id: result!.id,
    });

    // Send cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Response
    res.status(200).json({
      success: true,
      message: "User login successfully",
    });
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

// get info user

export const getInfoUser_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const cookeId = req.cookies.access_token;
     if (!cookeId) {
      return next(new AppError("token is not found", 401));
    }
    const decoded = jwt.decode(cookeId);

    if (!decoded || typeof decoded === "string") {
      throw new AppError("Invalid token", 401);
    }

    const result = await getInfo_servece(decoded.id);
    // console.log('result', result)

    res.status(200).json({
      success: true,
      message: "Get info user successfully",
      data: result,
    });
  } catch (err: any) {
    return next(mapDatabaseError(err));
  }
};
