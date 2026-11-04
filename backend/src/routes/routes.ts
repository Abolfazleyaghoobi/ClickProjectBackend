import { Router } from "express";
import { usersRouter } from "../modules/users/users.routes";

export const  apiRoute=Router();

// auth
apiRoute.use("/auth",usersRouter)











