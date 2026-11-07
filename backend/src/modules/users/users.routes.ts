import { Router } from "express";
import {  login_controller, register_controller } from "./users.controller";


export const usersRouter = Router();


// register user
usersRouter.post("/register",register_controller)

// login user
usersRouter.post("/login",login_controller)



