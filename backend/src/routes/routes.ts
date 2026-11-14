import { Router } from "express";
import { usersAuthRouter, usersProfileRouter } from "../modules/users/users.routes";
import { mediaRouter } from "../modules/media/media.route";
import { achievementRouter } from "../modules/achievement/achievement.route";
import { certificateTypeRouter } from "../modules/certificateType/certificateType.route";


export const  apiRoute=Router();

// auth
apiRoute.use("/auth",usersAuthRouter)

// profile
apiRoute.use("/profile",usersProfileRouter)

// uploade media
apiRoute.use("/upload",mediaRouter)


// achievement
apiRoute.use("/achievement",achievementRouter)


// certificate type
apiRoute.use("/crttype",certificateTypeRouter)





