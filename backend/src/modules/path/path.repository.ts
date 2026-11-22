import { AppDataSource } from "../../databases/data-source";
import { Path } from "./entity/path.entity";





export const pathRepository = AppDataSource.getRepository(Path);