import { Router } from "express";
import { loginAdmin_controller } from "./admin.controller";

export const adminRouter = Router();



adminRouter.post("/login", loginAdmin_controller);











