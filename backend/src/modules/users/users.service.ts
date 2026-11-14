import path from "node:path";
import { unlink } from "node:fs/promises";
import { AppDataSource } from "../../databases/data-source";
import { AppError } from "../../shared/errors/app.error";
import { hashPassword, verifyPassword } from "../../shared/utils/hashPassword";
import { UserProfile } from "./entities/userProfile.entity";
import { User, UserRole } from "./entities/users.entity";
import {
  AssignCRTDTO,
  CreateProjectDTO,
  GetInfoUserDTO,
  Login_interface,
  Register_interface,
  UpdateProfileDTO,
  UpdateProjectDTO,
  UpdateUserDTO,
} from "./users.dto";

import {
  PhoneVerificationCodeRepository,
  profileRepository,
  projectRepository,
  userCertificateRepository,
  usersRepository,
} from "./users.repository";
import { UserToken } from "./entities/accountToken.entity";
import { generateAccountToken } from "../../shared/utils/generateTokenAccount";
import { generateOtp } from "../../shared/utils/generateOPT";
import { IsNull, MoreThan } from "typeorm";
import { certificateTypeRepository } from "../certificateType/certificateType.repository";

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

    // generate user achievement

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
        github_url: profile.github_url,
        portolio_url: profile.portolio_url,
        avatar_url: profile.avatar_url,
        banner_url: profile.banner_url,
      },
      userToken: {
        rawToken: userToken.token_Raw,
        prefix: userToken.prefix,
        label: userToken.label,
      },
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

// update profile
export const updateProfile_service = async (
  userId: string,
  data: UpdateProfileDTO,
  files?: {
    avatar_url?: Express.Multer.File[];
    banner_url?: Express.Multer.File[];
  },
) => {
  console.log("data", data);

  const profile = await profileRepository.findOne({
    where: { user_id: userId },
  });

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  const updateData: Partial<typeof profile> = {};

  // Bio
  if (data.bio !== undefined) {
    updateData.bio = data.bio;
  }

  // Display name
  if (data.display_name !== undefined) {
    updateData.display_name = data.display_name;
  }

  // Avatar
  const avatarFile = files?.avatar_url?.[0];

  if (avatarFile) {
    updateData.avatar_url = `/uploads/${avatarFile.filename}`;
  } else if (data.avatar_url === null) {
    updateData.avatar_url = null;
  }

  // Banner
  const bannerFile = files?.banner_url?.[0];

  if (bannerFile) {
    updateData.banner_url = `/uploads/${bannerFile.filename}`;
  } else if (data.banner_url === null) {
    updateData.banner_url = null;
  }

  // GitHub URL
  if (data.github_url !== undefined) {
    updateData.github_url = data.github_url;
  }

  // Portfolio URL
  if (data.portolio_url !== undefined) {
    updateData.portolio_url = data.portolio_url;
  }

  // Check empty update
  if (!Object.keys(updateData).length) {
    throw new AppError("No data for update", 400);
  }

  // Update database
  await profileRepository.update({ user_id: userId }, updateData);

  // Delete old images
  const filesToDelete: string[] = [];

  if ((avatarFile || data.avatar_url === null) && profile.avatar_url) {
    filesToDelete.push(profile.avatar_url);
  }

  if ((bannerFile || data.banner_url === null) && profile.banner_url) {
    filesToDelete.push(profile.banner_url);
  }

  // Remove old files from server
  for (const file of filesToDelete) {
    const filename = path.basename(file);

    const filePath = path.resolve(process.cwd(), "backend/upload", filename);

    await unlink(filePath).catch(() => {
      // Ignore if old file does not exist
    });
  }

  return {
    success: true,
    message: "Profile updated successfully",
  };
};

// updata account
export const updateAccount_service = async (
  userId: string,
  data: UpdateUserDTO,
) => {
  const user = await usersRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("Profile not found", 404);
  }

  if (!user.changeNumber) {
    throw new AppError("you can not change number", 403);
  }

  user.changeNumber = false;

  Object.assign(user, data);

  await usersRepository.save(user);

  return user;
};

//  send code for change phone number
export const sendCodeForChange_service = async (userId: string) => {
  const checkOtp = await PhoneVerificationCodeRepository.findOne({
    where: {
      user: { id: userId },
    },
  });
  if (checkOtp) {
    throw new AppError("شما قبلاً درخواست کد داده‌اید", 400);
  }
  const user = await usersRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // generate code
  const code = generateOtp();

  // save code in database
  const otp = PhoneVerificationCodeRepository.create({
    user: user,

    code: code,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    attempts: 0,
    consumed_at: null,
  });

  await PhoneVerificationCodeRepository.save(otp);

  return {
    success: true,
    message: "Code sent successfully",
  };
};

//  verify code for change phone number
export const verifyCodeForChange_service = async (
  userId: string,
  code: string,
) => {
  const user = await usersRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const otp = await PhoneVerificationCodeRepository.findOne({
    where: {
      user: { id: userId },
      code: code,
      consumed_at: IsNull(),
      expires_at: MoreThan(new Date()),
    },
  });

  if (!otp) {
    throw new AppError("Invalid or expired code", 400);
  }

  user.changeNumber = true;
  await usersRepository.save(user);
  // mark the code as consumed
  otp.consumed_at = new Date();
  await PhoneVerificationCodeRepository.remove(otp);

  return {
    success: true,
    message: "Code verified successfully",
  };
};
// show code for admin
export const showCodesForAdmin_service = async () => {
  const otps = await PhoneVerificationCodeRepository.find({
    relations: {
      user: true,
    },
    order: {
      created_at: "DESC",
    },
  });

  return {
    success: true,
    count: otps.length,
    codes: otps.map((otp) => ({
      id: otp.id,
      username: otp.user.username,
      phone: otp.user.phone,
      code: otp.code,
      expires_at: otp.expires_at,
      attempts: otp.attempts,
      consumed_at: otp.consumed_at,
      created_at: otp.created_at,
    })),
  };
};
// create project
export const createProject_service = async (
  userId: string,
  data: CreateProjectDTO,
) => {
  const user = await usersRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Assuming you have a Project entity and repository set up
  const project = projectRepository.create({
    ...data,
    user: user,
  });

  await projectRepository.save(project);

  const responce_custom = {
    id: project.id,
    title: project.title,
    description: project.description,
    project_url: project.project_url,
  };

  return responce_custom;
};

// update project
export const updateProject_service = async (
  projectId: number,
  data: UpdateProjectDTO,
) => {
  if (typeof projectId !== "number") {
    throw new AppError("Invalid projectId", 400);
  }
  const project = await projectRepository.findOneBy({ id: projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  Object.assign(project, data);

  return await projectRepository.save(project);
};

// delete project
export const deleteProject_service = async (projectId: number) => {
  if (typeof projectId !== "number") {
    throw new AppError("Invalid projectId", 400);
  }
  const project = await projectRepository.findOneBy({ id: projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  await projectRepository.remove(project);

  return { message: "Project deleted successfully" };
};

// assign certificate

export const assignCertificate_service = async (
  idAdmin: string,
  data: AssignCRTDTO,
) => {
  // بررسی ادمین
  const isAdmin = await usersRepository.findOne({
    where: { id: idAdmin },
  });

  if (!isAdmin || isAdmin.role !== UserRole.ADMIN) {
    throw new AppError("You are not admin", 403);
  }

  // بررسی وجود کاربر دریافت‌کننده گواهی
  const isUser = await usersRepository.findOne({
    where: { id: data.userId },
  });

  if (!isUser) {
    throw new AppError("User not found", 404);
  }

  // بررسی نوع گواهی
  const certificateType = await certificateTypeRepository.findOne({
    where: { id: data.certificateTypeId },
  });

  if (!certificateType) {
    throw new AppError("Certificate type not found", 404);
  }

  // بررسی تکراری نبودن
  const existingCertificate = await userCertificateRepository.findOne({
    where: {
      userId: data.userId,
      certificateTypeId: data.certificateTypeId,
    },
  });

  if (existingCertificate) {
    throw new AppError("User already has this certificate", 409);
  }

  // ثبت گواهی
  const userCertificate = userCertificateRepository.create({
    userId: String(data.userId),
    certificateTypeId: String(data.certificateTypeId),
    source: isAdmin.profile?.display_name ?? "admin",
    awardedAt: new Date(),
  });

  await userCertificateRepository.save(userCertificate);

  return userCertificate;
};
