import { Router } from "express";
import { changeCoursePath_controller, coursePath_controller, deleteCoursePath_controller, getCoursePath_controller } from "./courses_path.controller";
import { authenticateAdmin, isAccessAdmin } from "../../shared/middlewares/isAdmin.middleware";

export const coursesPathRouter = Router();

coursesPathRouter.post("/add_course", authenticateAdmin, isAccessAdmin,coursePath_controller)

coursesPathRouter.post("/get_course_path",authenticateAdmin, isAccessAdmin, getCoursePath_controller)


coursesPathRouter.delete("/delete_course_path", authenticateAdmin, isAccessAdmin,deleteCoursePath_controller)

coursesPathRouter.post('/change_course_path',authenticateAdmin, isAccessAdmin,changeCoursePath_controller)







