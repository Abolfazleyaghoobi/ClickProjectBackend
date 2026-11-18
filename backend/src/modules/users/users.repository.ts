import { AppDataSource } from "../../databases/data-source";
import { AppError } from "../../shared/errors/app.error";
import { PhoneVerificationCode } from "./entities/PhoneVerificationCode.entity";
import { UserCertificate } from "./entities/userCertificate.entity";
import { UserProfile } from "./entities/userProfile.entity";
import { Project } from "./entities/userProject.entity";
import { AdminRole, User } from "./entities/users.entity";
import { GetInfoUserDTO } from "./users.dto";

export const usersRepository = AppDataSource.getRepository(User);

export const profileRepository = AppDataSource.getRepository(UserProfile);

export const projectRepository = AppDataSource.getRepository(Project);

export const PhoneVerificationCodeRepository = AppDataSource.getRepository(
  PhoneVerificationCode,
);
export const userCertificateRepository =
  AppDataSource.getRepository(UserCertificate);

export const GetAllUsers_Repository = async (data: GetInfoUserDTO) => {
  if (!data.id && !data.username) {
    throw new AppError("id or username is required", 400);
  }
  if (data.username && typeof data.username !== "string") {
    throw new AppError("Invalid username", 400);
  }

  const user = await usersRepository.findOne({
    where: {
      ...(data.id && { id: data.id }),
      ...(data.username && { username: data.username }),
    },

    relations: {
      profile: true,
      AccountToken: true,
      projects: true,
      certificates: {
        certificateType: true,
      },
    },

    select: {
      id: true,
      username: true,
      phone: true,
      status: true,
      level: true,
      xp: true,
      xp_to_next_level: true,
      step_balance: true,
      role: true,
      profile: {
        display_name: true,
        bio: true,
        avatar_url: true,
        banner_url: true,
        github_url: true,
        portolio_url: true,
      },

      AccountToken: {
        token_Raw: Boolean(data.id),
        prefix: true,
        label: true,
      },

      projects: {
        id: true,
        title: true,
        description: true,
        project_url: true,
      },

      certificates: {
        userId: true,
        source: true,
        certificateTypeId: true,
        certificateType: {
          id: true,
          key: true,
          title: true,
          iconKey: true,
          color: true,
          isActive: true,
        },
      },
    },
  });

  return user;
};
