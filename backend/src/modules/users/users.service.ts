import path from "node:path";
import { unlink } from "node:fs/promises";
import { AppDataSource } from "../../databases/data-source";
import { AppError } from "../../shared/errors/app.error";
import { hashPassword, verifyPassword } from "../../shared/utils/hashPassword";
import { UserProfile } from "./entities/userProfile.entity";
import { User } from "./entities/users.entity";
import {
  GetInfoUserDTO,
  Login_interface,
  Register_interface,
  UpdateProfileDTO,
  UpdateUserDTO,
} from "./users.dto";

import { profileRepository, usersRepository } from "./users.repository";
import { UserToken } from "./entities/accountToken.entity";
import { generateAccountToken } from "../../shared/utils/generateTokenAccount";

// register User
export const createUser_service = async (data: Register_interface) => {
  return await AppDataSource.transaction(async (manager: any) => {
    const userRepository = manager.getRepository(User);
    const profileRepository = manager.getRepository(UserProfile);
    const userTokenRepository = manager.getRepository(UserToken);
    const { rawToken, prefix } = generateAccountToken();

    // Hash Password
    const passwordHash = await hashPassword(data.password);

    // Create User
    const user = userRepository.create({
      username: data.username,
      phone: data.phone,
      password_hash: passwordHash,
    });

    const savedUser = await userRepository.save(user);

    // Create User Profile
    const profile = profileRepository.create({
      user: savedUser,
      display_name: data.display_name,
    });

    // generate account token
    const userToken = userTokenRepository.create({
      user: savedUser,
      token_Raw: rawToken,
      prefix: prefix,
      label: "Account Token",
    });

    await profileRepository.save(profile);
    await userTokenRepository.save(userToken);
    // Return User Data
    return {
      id: savedUser.id,
      username: savedUser.username,
      phone: savedUser.phone,
      role: savedUser.role,
      status: savedUser.status,
      level: savedUser.level,
      xp: savedUser.xp,
      xp_to_next_level: savedUser.xp_to_next_level,
      step_balance: savedUser.step_balance,
      profile: {
        display_name: profile.display_name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        banner_url: profile.banner_url,
      },
      userToken: {
        rawToken: userToken.token_Raw,
        prefix: userToken.prefix,
        label: userToken.label,
      }
    };
  });
};

// login user
export const login_service = async (data: Login_interface) => {
  const existUser = await usersRepository
    .createQueryBuilder("user")
    .addSelect("user.password_hash")
    .leftJoinAndSelect("user.profile", "profile")
    .where("user.username = :username", {
      username: data.username,
    })
    .getOne();

  if (!existUser) {
    throw new AppError("Username not found", 404);
  }

  const isMatch = await verifyPassword(data.password, existUser.password_hash);

  if (!isMatch) {
    throw new AppError("Password not match", 401);
  }
  const userResponse = {
    id: existUser.id,
    username: existUser.username,
    phone: existUser.phone,
    profile: {
      avatar_url: existUser.profile?.avatar_url,
    },
  };
  return userResponse;
};

// get info user
export const getInfo_servece = async (data: GetInfoUserDTO) => {
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
      profile: {
        display_name: true,
        bio: true,
        avatar_url: true,
        banner_url: true,
      },
      AccountToken: {
        token_Raw: true,
        prefix: true,
        label: true,
      }
    },
  });

  return user;
};

// update profile
export const updateProfile = async (
  userId: string,
  data: UpdateProfileDTO,
  files?: {
    avatar_url?: Express.Multer.File[];
    banner_url?: Express.Multer.File[];
  },
) => {
  const profile = await profileRepository.findOne({
    where: { user_id: userId },
  });

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }
  const updateData: Partial<typeof profile> = {};
  if (data.bio) {
    updateData.bio = data.bio;
  }
  if (data.display_name) {
    updateData.display_name = data.display_name;
  }

  if (files!.avatar_url) {
    updateData.avatar_url = `${files!.avatar_url[0].path}`;
  }
  if (files!.banner_url) {
    updateData.banner_url = `${files!.banner_url[0].path}`;
  }
  if (!Object.keys(updateData).length) {
    throw new AppError("no data for update", 400);
  }
  await profileRepository.update({ user_id: userId }, updateData);

  const filesToDelete: string[] = [];

  if (files!.avatar_url && profile.avatar_url) {
    filesToDelete.push(profile.avatar_url);
  }

  if (files!.banner_url && profile.banner_url) {
    filesToDelete.push(profile.banner_url);
  }

  for (const file of filesToDelete) {
    const filename = path.basename(file);
    const filePath = path.resolve(process.cwd(), "uploads", filename);

    await unlink(filePath).catch(() => {
      // در صورت نبود فایل، آپدیت دیتابیس همچنان موفق است.
    });
  }

  return {
    success: true,
    message: "Profile updated successfully",
  };
};

// updata account
export const updateAccount = async (userId: string, data: UpdateUserDTO) => {
  const profile = await usersRepository.findOneBy({
    id: userId,
  });

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  Object.assign(profile, data);

  return await usersRepository.save(profile);
};
