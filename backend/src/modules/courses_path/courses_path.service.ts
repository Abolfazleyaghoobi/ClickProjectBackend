import { AppDataSource } from "../../databases/data-source";
import { AppError } from "../../shared/errors/app.error";
import { coursesRepository } from "../courses/courses.repository";
import { addCourseToPathDto, changeCoursePathDto } from "./courses_path.dto";
import {
  pathList_courseRepository,
  pathListRepository,
} from "./courses_path.repository";
import { PathList_course } from "./entity/pathList_course.entity";

export const getAllCoursPath_service = async (id: number) => {
  const data = await pathList_courseRepository.find({
    where: {
      path_list_id: Number(id),
    },
    relations: {
      course: true,
    },
    order:{
        number_course_tutorial:"ASC"
    }
  });
  if (!data) {
    throw new AppError("Not data", 409);
  }
  const customResponse = data.map((item) => {
    return {
      id: item.id,
      numberSort: item.number_course_tutorial,
      course: item.course,
    };
  });

  return customResponse;
};

export const addCourseToPath_service = async (data: addCourseToPathDto) => {
  console.log({
    courseId: data.courseId,
    pathId: data.pathListId,
  });
  const isExistPath = await pathListRepository.existsBy({
    id: +data.pathListId,
  });
  if (!isExistPath) {
    throw new AppError("path not found", 404);
  }
  const isExistCourse = await coursesRepository.existsBy({
    id: +data.courseId,
  });
  if (!isExistCourse) {
    throw new AppError("course not found", 404);
  }
  const isExistCourseToPathDuplicate = await pathList_courseRepository.existsBy(
    {
      number_course_tutorial: +data.number_course_tutorial,
    },
  );
  if (isExistCourseToPathDuplicate) {
    throw new AppError("number_course_tutorial already exist in path", 409);
  }
  const addCourseToPath = await pathList_courseRepository.create({
    coursesId: +data.courseId,
    path_list_id: +data.pathListId,
    number_course_tutorial: +data.number_course_tutorial,
  });
  await pathList_courseRepository.save(addCourseToPath);
  return "addCourseToPath successfully";
};

export const deleteCoursesPath_service = async (id: string) => {
  await AppDataSource.transaction(async (manager) => {
    const repository = manager.getRepository(PathList_course);

    const course = await repository.findOneBy({
      id: Number(id),
    });

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    // حذف دوره
    await repository.remove(course);

    // کاهش ترتیب دوره‌های بعد از دوره حذف‌شده
    await repository
      .createQueryBuilder()
      .update(PathList_course)
      .set({
        number_course_tutorial: () => "`number_course_tutorial` - 1",
      })
      .where("path_list_id = :pathListId", {
        pathListId: course.path_list_id,
      })
      .andWhere("number_course_tutorial > :numberSort", {
        numberSort: course.number_course_tutorial,
      })
      .execute();
  });

  return "deleteCourseToPath successfully";
};


export const changeCoursePath_service = async (data:changeCoursePathDto)=>{
  return  await AppDataSource.transaction(async (manager) => {
  const repository = manager.getRepository(PathList_course);

  const firstCourse = await repository.findOneBy({ id: +data.fristID });
  const secondCourse = await repository.findOneBy({ id: +data.secondID });

  if (!firstCourse || !secondCourse) {
    throw new AppError("Course not found",404);
  }

  const temp = firstCourse.number_course_tutorial;

  firstCourse.number_course_tutorial =
    secondCourse.number_course_tutorial;

  secondCourse.number_course_tutorial = temp;

  await repository.save([firstCourse, secondCourse]);
});
}