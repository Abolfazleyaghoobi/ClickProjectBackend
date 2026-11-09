import jwt from "jsonwebtoken";
import { AppError } from "../errors/app.error";

export const decodeToken=(data:any)=>{
    const decoded = jwt.decode(data);

    if (!decoded || typeof decoded === "string") {
      throw new AppError("Invalid token", 401);
    }
    return decoded;
}