import { Router } from "express";
import {  assignCertificate_controller, createProject_controller, deleteProject_controller, getInfoUser_controller, getInfoUserByUsername_controller, login_controller, logout_controller, register_controller, sendCodeForChange_controller, showCodeForChange_controller, updateAccount_controller, updateProfile_controller, updateProject_controller, verifyCodeForChange_controller } from "./users.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";
import { imageUpload } from "../media/media.upload";
import { validateImageContent } from "../media/media.validation";



export const usersAuthRouter = Router();
export const usersProfileRouter = Router();


// register user
usersAuthRouter.post("/register",register_controller)

// login user
usersAuthRouter.post("/login",login_controller)
// logout user
usersAuthRouter.post("/logout",logout_controller)

// send code for change phone number
usersProfileRouter.post("/sendCodeForChange",authenticate,sendCodeForChange_controller)

// verify code for change phone number
usersProfileRouter.post("/verifyCodeForChange",authenticate,verifyCodeForChange_controller)

// show code for admin
usersProfileRouter.get("/showCodeForChange",authenticate,showCodeForChange_controller)

// get all profile
usersProfileRouter.get("/",authenticate,getInfoUser_controller)
// get profile by username
usersProfileRouter.get("/:username",getInfoUserByUsername_controller)


// update profile
usersProfileRouter.patch("/update",authenticate,imageUpload.fields([
  { name: "avatar_url", maxCount: 1 },
  { name: "banner_url", maxCount: 1 }
]),validateImageContent,updateProfile_controller)

// update account
usersProfileRouter.patch("/updateAccount",authenticate,updateAccount_controller)

// create project
usersProfileRouter.post("/project",authenticate,createProject_controller)

// update project
usersProfileRouter.patch("/project/:id",authenticate,updateProject_controller)

// remove project
usersProfileRouter.delete("/project/:id",authenticate,deleteProject_controller)


// assign certifacate
usersProfileRouter.post("/assigncrt",authenticate,assignCertificate_controller)