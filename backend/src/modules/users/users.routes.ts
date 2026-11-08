import { Router } from "express";
import {  getInfoUser_controller, login_controller, register_controller, updateAccount_controller, updateProfile_controller } from "./users.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";


export const usersAuthRouter = Router();
export const usersProfileRouter = Router();


// register user
usersAuthRouter.post("/register",register_controller)

// login user
usersAuthRouter.post("/login",login_controller)

// get all profile
usersProfileRouter.get("/",authenticate,getInfoUser_controller)

// update profile
usersProfileRouter.patch("/update",authenticate,updateProfile_controller)

// update account
usersProfileRouter.patch("/updateAccount",authenticate,updateAccount_controller)

    