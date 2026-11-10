import { Router } from "express";
import {  getInfoUser_controller, getInfoUserByUsername_controller, login_controller, register_controller, updateAccount_controller, updateProfile_controller } from "./users.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";
import { imageUpload } from "../media/media.upload";
import { validateImageContent } from "../media/media.validation";


export const usersAuthRouter = Router();
export const usersProfileRouter = Router();


// register user
usersAuthRouter.post("/register",register_controller)

// login user
usersAuthRouter.post("/login",login_controller)

// get all profile
usersProfileRouter.get("/",authenticate,getInfoUser_controller)
usersProfileRouter.get("/:username",getInfoUserByUsername_controller)


// update profile
usersProfileRouter.patch("/update",authenticate,imageUpload.fields([
  { name: "avatar_url", maxCount: 1 },
  { name: "banner_url", maxCount: 1 }
]),validateImageContent,updateProfile_controller)

// update account
usersProfileRouter.patch("/updateAccount",authenticate,updateAccount_controller)

    