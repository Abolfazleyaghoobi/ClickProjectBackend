
import { Router } from "express";

import { uploadImage } from "./media.controller";
import { imageUpload } from "./media.upload";
import { validateImageContent } from "./media.validation";
import { authenticate } from "../../shared/middlewares/auth.middleware";
export const mediaRouter = Router();

// mediaRouter.post(
//   "/images",
//   authenticate,
//   imageUpload.fields([
//   { name: "profileImage", maxCount: 1 },
//   { name: "bannerImage", maxCount: 1 },
//   { name: "gallery", maxCount: 10 },
// ]),
//   validateImageContent,
//   uploadImage,
// );


mediaRouter.patch(
  "/updateProfileImage",
authenticate,
  imageUpload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 }
]),
  validateImageContent,
  uploadImage,
);

