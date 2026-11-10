import type { RequestHandler } from "express";
import {
  CreateUserSchema,
  LoginUserSchema,
  UpdateAccountSchema,
  UpdateProfileSchema,
} from "./users.validataion";
import { AppError } from "../../shared/errors/app.error";
import { string, ZodError } from "zod";
import {
  createUser_service,
  getInfo_servece,
  login_service,
  updateAccount,
  updateProfile,
} from "./users.service";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import { generateToken } from "../../shared/utils/generateJWT";
import jwt from "jsonwebtoken";
import { decodeToken } from "../../shared/utils/decode";
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
      secure: false, // فقط محیط توسعه
      sameSite: "lax",
      path: "/",
      maxAge: 70 * 60 * 1000, // 15 دقیقه
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
  try {
    const data = LoginUserSchema.parse(req.body);
    const result = await login_service(data);

    // Generate token
    const token = generateToken({
      id: result!.id,
    });

    // Send cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // فقط محیط توسعه
      sameSite: "lax",
      path: "/",
      maxAge: 70 * 60 * 1000, // 15 دقیقه
    });

    // Response
    res.status(200).json({
      success: true,
      message: "User login successfully",
      result,
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
    console.log('decoded', decoded)

    const result = await getInfo_servece({ id: decoded.id });
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

// get info for username
export const getInfoUserByUsername_controller: RequestHandler = async (req,res,next)=>{
  try {
 const username = req.params.username;
    const result = await getInfo_servece({ username });
    res.status(200).json({
      success: true,
      message: "Get info user successfully",
      data: result,
    });
  } catch (err: any) {
    return next(mapDatabaseError(err));
  }
}


// update profile
export const updateProfile_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    if (req.is("multipart/form-data")) {
    
      
      const token = req.cookies.access_token;
      const decoded = jwt.decode(token);
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
      if (!decoded || typeof decoded === "string") {
        throw new AppError("Invalid token", 401);
      }

      const data = UpdateProfileSchema.parse(req.body);

      const result = await updateProfile(decoded.id, data,files);

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: result,
      });
    } 
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

// update user account
export const updateAccount_controller: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const resultDecode = decodeToken(req.cookies.access_token);

    const data = UpdateAccountSchema.parse(req.body);

    const result = await updateAccount(resultDecode.id, data);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
