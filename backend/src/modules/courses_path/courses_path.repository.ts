import { AppDataSource } from "../../databases/data-source"
// import { Path_List } from "./entity/path_list.entity"
import { PathList_course } from "./entity/pathList_course.entity"

// export const pathListRepository= AppDataSource.getRepository(Path_List)

export const pathList_courseRepository = AppDataSource.getRepository(PathList_course)