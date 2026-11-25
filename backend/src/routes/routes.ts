import { Router } from "express";
import { globalRouter, usersAuthRouter, usersProfileRouter } from "../modules/users/users.routes";
import { mediaRouter } from "../modules/media/media.route";
import { achievementRouter } from "../modules/achievement/achievement.route";
import { certificateTypeRouter } from "../modules/certificateType/certificateType.route";
import { adminRouter } from "../modules/admin/admin.route";
import { pathRouter } from "../modules/path/path.route";
import { coursesRouter } from "../modules/courses/courses.route";
import { coursesPathRouter } from "../modules/courses_path/courses_path.route";


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

// rout admin 
apiRoute.use("/admin",adminRouter)

// route path
apiRoute.use("/path",pathRouter)

// global route
apiRoute.use("/global",globalRouter)

// route courses
apiRoute.use("/course",coursesRouter)

// route course_path

apiRoute.use("/course_path",coursesPathRouter)
