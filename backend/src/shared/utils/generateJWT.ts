import jwt from "jsonwebtoken";
import { env } from "../../configs/env";

export type TokenPayload = {
  id: string;
  type: "user" | "support";
};

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}