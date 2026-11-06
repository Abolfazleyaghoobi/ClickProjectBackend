import { Router } from "express";
import {  register_controller } from "./users.controller";


export const usersRouter = Router();

// post

usersRouter.post("/register",register_controller)