import { AppDataSource } from "../../databases/data-source"
import { Path_List } from "./entity/path_list.entity"

export const pathListRepository= AppDataSource.getRepository(Path_List)