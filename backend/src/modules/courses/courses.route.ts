import { Router } from "express";
import { createCourse_controller, deleteConference_controller, deleteCourse_controller, deleteImage_controller, deleteLink_controller, deleteResearch_controller, deleteStep_controller, getAllCourse_controller, getCourseById_controller, updateCourse_controller } from "./courses.controller";
import { authenticateAdmin, isAccessAdmin } from "../../shared/middlewares/isAdmin.middleware";
import { imageUpload } from "../media/media.upload";

export const coursesRouter = Router();

// create course
coursesRouter.post(
  "/create_course",
  authenticateAdmin,
  isAccessAdmin,
  imageUpload.any(),
  createCourse_controller
);

// update course
coursesRouter.patch(
  "/update_course/:id",
  authenticateAdmin,
  isAccessAdmin,
  imageUpload.any(),
  updateCourse_controller,
);

// delete course
coursesRouter.delete('/delete_course/:id', authenticateAdmin, isAccessAdmin ,deleteCourse_controller)

coursesRouter.delete(
  "/:courseId/steps/:stepId",
  authenticateAdmin,
  isAccessAdmin,
  deleteStep_controller,
);

coursesRouter.delete(
  "/steps/:stepId/links/:linkId",
  authenticateAdmin,
  isAccessAdmin,
  deleteLink_controller,
);

coursesRouter.delete(
  "/steps/:stepId/research/:researchId",
  authenticateAdmin,
  isAccessAdmin,
  deleteResearch_controller,
);

coursesRouter.delete(
  "/steps/:stepId/conferences/:conferenceId",
  authenticateAdmin,
  isAccessAdmin,
  deleteConference_controller,
);

coursesRouter.delete(
  "/steps/:stepId/images/:imageId",
  authenticateAdmin,
  isAccessAdmin,
  deleteImage_controller,
);

// get all courses
coursesRouter.get('/getAll_course', authenticateAdmin, isAccessAdmin ,getAllCourse_controller)

coursesRouter.get(
  "/:id",
  authenticateAdmin,
  isAccessAdmin,
  getCourseById_controller,
);



