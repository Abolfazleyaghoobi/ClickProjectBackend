import jwt from "jsonwebtoken";
import { env } from "../../configs/env";


export function generateToken(payload: { id: string }) {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "7d",
    });
}