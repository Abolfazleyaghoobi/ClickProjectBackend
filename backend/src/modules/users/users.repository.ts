import { AppDataSource } from "../../databases/data-source";
import { PhoneVerificationCode } from "./entities/PhoneVerificationCode.entity";
import { UserCertificate } from "./entities/userCertificate.entity";
import { UserProfile } from "./entities/userProfile.entity";
import { Project } from "./entities/userProject.entity";
import { User } from "./entities/users.entity";

export const usersRepository = AppDataSource.getRepository(User);

export const profileRepository = AppDataSource.getRepository(UserProfile);

export const projectRepository = AppDataSource.getRepository(Project);

export const PhoneVerificationCodeRepository = AppDataSource.getRepository(PhoneVerificationCode);
export const userCertificateRepository = AppDataSource.getRepository(UserCertificate);


