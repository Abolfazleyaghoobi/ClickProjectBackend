import { AppError } from "../../shared/errors/app.error";
import { pathListRepository } from "../courses_path/CP.repository";
import { PathCreateDTO } from "./path.dto";
import { pathRepository } from "./path.repository";

export const pathCreate_service = async (data: PathCreateDTO,files?: {
    image_url?: Express.Multer.File[];
  },) => {
    // exsits ket
  const isKey = await pathRepository.exists({
    where: {
      key: data.key,
    },
  });
  if (isKey) {
    throw new AppError("key already exists",400);
  }
  // create path
  const imageCoverPath=files?.image_url?.[0]
  const path = await pathRepository.create({
      key: data.key,
      title: data.title,
      description: data.description,
      image_ulr:`/uploads/${imageCoverPath!.filename}` ,
      is_published: data.is_published,
    });
    await pathRepository.save(path);
    
    const pathList = await pathListRepository.create({
        pathId: path.id,
    });
 
  await pathListRepository.save(pathList);

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
