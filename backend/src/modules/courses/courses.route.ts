import { Router } from "express";
import { createCourse_controller, deleteCourse_controller, getAllCourse_controller, updateCourse_controller } from "./courses.controller";
import { authenticateAdmin, isAccessAdmin } from "../../shared/middlewares/isAdmin.middleware";
import { imageUpload } from "../media/media.upload";

export const coursesRouter = Router();

// create course
coursesRouter.post('/create_course',authenticateAdmin, isAccessAdmin ,imageUpload.fields([
  { name: "image_url", maxCount: 1 }
]),createCourse_controller)

// update course
coursesRouter.patch('/update_course/:id',authenticateAdmin, isAccessAdmin ,imageUpload.fields([
  { name: "image_url", maxCount: 1 }
]),updateCourse_controller)

// delete course
coursesRouter.delete('/delete_course/:id', authenticateAdmin, isAccessAdmin ,deleteCourse_controller)



// get all courses
coursesRouter.get('/getAll_course', authenticateAdmin, isAccessAdmin ,getAllCourse_controller)





