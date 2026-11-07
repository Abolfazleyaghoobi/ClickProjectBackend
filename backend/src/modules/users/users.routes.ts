import { Router } from "express";
import {  getInfoUser_controller, login_controller, register_controller } from "./users.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";


export const usersRouter = Router();


// register user
usersRouter.post("/register",register_controller)

// login user
usersRouter.post("/login",login_controller)


usersRouter.get("/profile",authenticate,getInfoUser_controller)


