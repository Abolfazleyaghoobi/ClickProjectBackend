import { unlink } from "node:fs/promises";
import path from "node:path";
import { profileRepository } from "../users/users.repository";
import { AppError } from "../../shared/errors/app.error";


export const updateProfileIMG_service = async (
  id: string,
  data: {
    profileImage?: Express.Multer.File;
    bannerImage?: Express.Multer.File;
  },
) => {
  const profile = await profileRepository.findOne({
    where: { user_id: id },
  });

  if (!profile) {
    throw new AppError("پروفایل پیدا نشد", 404);
  }

  const updateData: Partial<typeof profile> = {};

  if (data.profileImage) {
    updateData.avatar_url = `/uploads/${data.profileImage.filename}`;
  }

  if (data.bannerImage) {
    updateData.banner_url = `/uploads/${data.bannerImage.filename}`;
  }

  if (!Object.keys(updateData).length) {
    throw new AppError("هیچ تصویری ارسال نشده است", 400);
  }

  await profileRepository.update(
    { user_id: id },
    updateData,
  );

  // حذف تصاویر قبلی بعد از آپدیت موفق دیتابیس
  const filesToDelete: string[] = [];

  if (data.profileImage && profile.avatar_url) {
    filesToDelete.push(profile.avatar_url);
  }

  if (data.bannerImage && profile.banner_url) {
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
    message: "تصاویر پروفایل با موفقیت بروزرسانی شدند",
  };
};