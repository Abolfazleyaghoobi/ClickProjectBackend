import { Router } from "express";
import { createPath_controller } from "./path.controller";
import { imageUpload } from "../media/media.upload";

export const pathRouter = Router();


pathRouter.post('/create',imageUpload.fields([
  { name: "image_url", maxCount: 1 }
]), createPath_controller)



