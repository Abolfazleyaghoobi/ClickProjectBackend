import { Router } from "express";
import { createUser } from "./users.controller";


export const usersRouter = Router();

// post

usersRouter.get("/register",createUser)