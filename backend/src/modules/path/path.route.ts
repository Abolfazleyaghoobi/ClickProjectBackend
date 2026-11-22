import { Router } from "express";
import { createPath_controller, deletePath_controller, getAllPaths_controller, updatePath_controller } from "./path.controller";
import { imageUpload } from "../media/media.upload";
import { authenticateAdmin, isAccessAdmin } from "../../shared/middlewares/isAdmin.middleware";

export const pathRouter = Router();


pathRouter.get('/getAll', authenticateAdmin, isAccessAdmin ,getAllPaths_controller)

pathRouter.post('/create', authenticateAdmin, isAccessAdmin ,imageUpload.fields([
  { name: "image_url", maxCount: 1 }
]), createPath_controller)

pathRouter.patch('/update/:id', authenticateAdmin, isAccessAdmin ,imageUpload.fields([
  { name: "image_url", maxCount: 1 }
]),updatePath_controller)


pathRouter.delete('/delete/:id', authenticateAdmin, isAccessAdmin ,deletePath_controller)
