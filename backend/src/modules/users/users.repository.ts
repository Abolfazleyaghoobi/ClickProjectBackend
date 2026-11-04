
import { AppDataSource } from "../../databases/data-source";
import { User } from "./entities/users.entity";


export const usersRepository = AppDataSource.getRepository(User);