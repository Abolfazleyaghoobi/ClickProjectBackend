import { Router } from "express";
import { loginAdmin_controller } from "./admin.controller";

export const adminRouter = Router();



adminRouter.post("/auth/login", loginAdmin_controller);











