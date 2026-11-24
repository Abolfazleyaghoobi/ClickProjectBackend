import path from "node:path";
import { AppError } from "../../shared/errors/app.error";
import { createCourseDTO, updateCourseDTO } from "./courses.dto";
import { coursesRepository } from "./courses.repository";
import { Course } from "./entity/courses.entity";
import { unlink } from "node:fs/promises";

export const createCourse_servise = async (
  data: createCourseDTO,
  files?: {
    image_url?: Express.Multer.File[];
  },
) => {
  const imageCoverPath = files?.image_url?.[0];

  const course = await coursesRepository.create({
    title: data.title,
    description: data.description,
    image_ulr: `/uploads/${imageCoverPath!.filename}`,
    is_published: data.is_published,
  });
  await coursesRepository.save(course);

  return course;
};

// update course
export const updateCourse_service = async (
  id: number,
  data: updateCourseDTO,
  files?: {
    image_url?: Express.Multer.File[];
  },
) => {
  const pathc = await coursesRepository.findOneBy({ id });

  if (!pathc) {
    throw new AppError("path not found", 404);
  }

  const updateData: Partial<Course> = {};

  if (data.title) {
    updateData.title = data.title;
  }

  if (data.description) {
    updateData.description = data.description;
  }

  if (data.is_published) {
    updateData.is_published = data.is_published;
  }

  const imgCoverPath = files?.image_url?.[0];

  if (imgCoverPath) {
    updateData.image_ulr = `/uploads/${imgCoverPath.filename}`;
  }

  // Check empty update
  if (!Object.keys(updateData).length) {
    throw new AppError("No data for update", 400);
  }

  // Update database
  await coursesRepository.update({ id }, updateData);

  // Delete old images
  const filesToDelete: string[] = [];

  if ((imgCoverPath || data.image_url === null) && pathc.image_ulr) {
    filesToDelete.push(pathc.image_ulr);
  }

  // Remove old files from server
  for (const file of filesToDelete) {
    const filename = path.basename(file);

    const filePath = path.resolve(process.cwd(), "backend/upload", filename);

    await unlink(filePath).catch(() => {
      // Ignore if old file does not exist
    });
  }

  return "course updated";
};

export const deleteCourse_service = async (id: number) => {
  const path = await coursesRepository.findOneBy({ id });

  if (!path) {
    throw new AppError("path not found", 404);
  }

  await coursesRepository.remove(path);
  return "course deleted successfully";
};



export const getAllCourse_service = async () => {
  const paths = await coursesRepository.find();
  return paths;
}
