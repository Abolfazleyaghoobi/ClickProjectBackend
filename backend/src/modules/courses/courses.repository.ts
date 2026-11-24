import { AppDataSource } from "../../databases/data-source";
import { Course } from "./entity/courses.entity";

export const coursesRepository = AppDataSource.getRepository(Course);



