import { AppDataSource } from "../../databases/data-source";
import { AchievementDefinition } from "./entity/achievement.entity";

export  const achievementRepository = AppDataSource.getRepository(AchievementDefinition);