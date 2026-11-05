import { Router } from "express";
import {  createUser_controller } from "./users.controller";


export const usersRouter = Router();

// post

usersRouter.post("/register",createUser_controller)