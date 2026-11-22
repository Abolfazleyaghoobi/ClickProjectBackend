import { Router } from "express";
import { createPath_controller, deletePath_controller, getAllPaths_controller, updatePath_controller } from "./path.controller";
import { imageUpload } from "../media/media.upload";

export const pathRouter = Router();


pathRouter.get('/getAll', getAllPaths_controller)

pathRouter.post('/create',imageUpload.fields([
  { name: "image_url", maxCount: 1 }
]), createPath_controller)

pathRouter.patch('/update/:id',imageUpload.fields([
  { name: "image_url", maxCount: 1 }
]),updatePath_controller)


pathRouter.delete('/delete/:id',deletePath_controller)
