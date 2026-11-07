import { Router } from "express";
import { usersAuthRouter } from "../modules/users/users.routes";
import { getInfoUser_controller } from "../modules/users/users.controller";

export const  apiRoute=Router();

// auth
apiRoute.use("/auth",usersAuthRouter)

// profile
apiRoute.use("/profile",getInfoUser_controller)










