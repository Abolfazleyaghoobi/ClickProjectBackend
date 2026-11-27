import { AppError } from "../../shared/errors/app.error";
// import { pathListRepository } from "../courses_path/courses_path.repository";
import path from "node:path";
import { Path } from "./entity/path.entity";
import { PathCreateDTO, PathUpdateDTO } from "./path.dto";
import { pathRepository } from "./path.repository";
import { unlink } from "node:fs/promises";
// get all path
export const getAllPath_service = async () => {
  const paths = await pathRepository.find({});
  return paths;
};

// create Path
export const pathCreate_service = async (
  data: PathCreateDTO,
  files?: {
    image_url?: Express.Multer.File[];
  },
) => {
  // exsits ket
  const isKey = await pathRepository.exists({
    where: {
      key: data.key,
    },
  });
  if (isKey) {
    throw new AppError("key already exists", 400);
  }
  // create path
  const imageCoverPath = files?.image_url?.[0];
  const path = await pathRepository.create({
    key: data.key,
    title: data.title,
    description: data.description,
    image_ulr: `/uploads/${imageCoverPath!.filename}`,
    is_published: data.is_published,
  });
  await pathRepository.save(path);

  const customResponse = {
    id: path.id,
    key: path.key,
    title: path.title,
    description: path.description,
    image_url: path.image_ulr,
    is_published: path.is_published,
  };
  return customResponse;
};

// update path
export const pathUpdate_service = async (
  id: number,
  data: PathUpdateDTO,
  files?: {
    image_url?: Express.Multer.File[];
  },
) => {
  const pathc = await pathRepository.findOneBy({ id });

  if (!pathc) {
    throw new AppError("path not found", 404);
  }

  const updateData: Partial<Path> = {};

  if (data.key) {
    updateData.key = data.key;
  }

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
  await pathRepository.update({ id }, updateData);

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

  return "path updated";
};

// delete path
export const pathDelete_service = async (id: number) => {
  const path = await pathRepository.findOneBy({ id });

  if (!path) {
    throw new AppError("path not found", 404);
  }

  await pathRepository.remove(path);
  return "path deleted successfully";
};
