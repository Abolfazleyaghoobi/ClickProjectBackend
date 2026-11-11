import {Router} from "express";
import { createAchivement_controller, updateAchivement_controller } from "./achievement.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";

export const achievementRouter = Router();
// create achievement
achievementRouter.post("/create",authenticate,createAchivement_controller)

// update achievement
achievementRouter.patch("/update/:id",authenticate,updateAchivement_controller)
