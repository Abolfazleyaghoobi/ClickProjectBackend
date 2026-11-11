
import { AppError } from "../../shared/errors/app.error";
import { UserRole } from "../users/entities/users.entity";
import { usersRepository } from "../users/users.repository";
import { CreateAchievementDto, UpadateAchievementDto } from "./achievement.dto";
import { achievementRepository } from "./achievement.repository";

export const createAchivement_service = async (
  id: string,
  data: CreateAchievementDto,
) => {
  const isAdmin = await usersRepository.findOne({
    where: {
      id,
    },
  });
  if (isAdmin?.role !== UserRole.ADMIN) {
    throw new AppError("You are not admin", 403);
  }
  const achivement = await achievementRepository.create(data);
  if (!achivement) {
    throw new AppError("Achivement not created", 400);
  }
  await achievementRepository.save(achivement);
  return achivement;
};

export const updateAchivement_service = async (
  id: string,
  data: UpadateAchievementDto,
  idAchievement: string,
) => {
  const isAdmin = await usersRepository.findOne({
    where: {
      id,
    },
  });
  if (isAdmin?.role !== UserRole.ADMIN) {
    throw new AppError("You are not admin", 403);
  }
  const achivement = await achievementRepository.findOneBy({
    id: idAchievement,
  });
  if (!achivement) {
    throw new AppError("Achivement not found", 404);
  }

   Object.assign(achivement, data); 
  
  
  
  return await achievementRepository.save(achivement);
};
