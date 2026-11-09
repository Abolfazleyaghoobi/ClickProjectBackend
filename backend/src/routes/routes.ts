import { Router } from "express";
import { usersAuthRouter, usersProfileRouter } from "../modules/users/users.routes";
import { mediaRouter } from "../modules/media/media.route";


export const  apiRoute=Router();

// auth
apiRoute.use("/auth",usersAuthRouter)

// profile
apiRoute.use("/profile",usersProfileRouter)

// uploade media
apiRoute.use("/upload",mediaRouter)








