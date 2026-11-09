
import { Router } from "express";

import { uploadImage } from "./media.controller";
import { imageUpload } from "./media.upload";
import { validateImageContent } from "./media.validation";
import { authenticate } from "../../shared/middlewares/auth.middleware";
const mediaRouter = Router();

mediaRouter.post(
  "/images",
  authenticate,
  imageUpload.single("image"),
  validateImageContent,
  uploadImage,
);

export { mediaRouter };
