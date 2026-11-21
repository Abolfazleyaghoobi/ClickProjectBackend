import { RequestHandler } from "express";
import { LoginSchema } from "./admin.validation";
import { AppError } from "../../shared/errors/app.error";
import { loginAdmin_service } from "./admin.service";
import { generateToken } from "../../shared/utils/generateJWT";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import { ZodError } from "zod";

export const loginAdmin_controller: RequestHandler = async (req, res, next) => {
  try {
    const data = LoginSchema.parse(req.body);

    if (!data) {
      throw new AppError("Invalid username or email", 400);
    }
    const result = await loginAdmin_service(data);

    // Generate token
    const token = generateToken({
      id: result!.id,
      type: "support",
    });
    // Send cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // فقط محیط توسعه
      sameSite: "lax",
      path: "/",
      maxAge: 10080 * 60 * 1000, // 15 دقیقه
    });
    res.status(200).json(result);
  } catch (err) {
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
