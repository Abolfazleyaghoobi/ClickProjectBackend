
import { AppDataSource } from "../../databases/data-source";
import { UserProfile } from "./entities/userProfile.entity";
import { User } from "./entities/users.entity";


export const usersRepository = AppDataSource.getRepository(User);



export const profileRepository = AppDataSource.getRepository(UserProfile);
 