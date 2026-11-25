import { Router } from "express";
import { changeCoursePath_controller, coursePath_controller, deleteCoursePath_controller, getCoursePath_controller } from "./courses_path.controller";

export const coursesPathRouter = Router();

coursesPathRouter.post("/add_course", coursePath_controller)

coursesPathRouter.post("/get_course_path", getCoursePath_controller)


coursesPathRouter.delete("/delete_course_path", deleteCoursePath_controller)

coursesPathRouter.post('/change_course_path',changeCoursePath_controller)







