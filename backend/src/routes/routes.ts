import { Router } from "express";
import { usersAuthRouter, usersProfileRouter } from "../modules/users/users.routes";


export const  apiRoute=Router();

// auth
apiRoute.use("/auth",usersAuthRouter)

// profile
apiRoute.use("/profile",usersProfileRouter)










