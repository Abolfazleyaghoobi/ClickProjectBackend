import { AppDataSource } from "../../databases/data-source";
import { Admins } from "./entity/admin.entity";

export const adminRepository = AppDataSource.getRepository(Admins);


