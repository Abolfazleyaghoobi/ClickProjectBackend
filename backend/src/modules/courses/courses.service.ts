import path from "node:path";
import { AppError } from "../../shared/errors/app.error";
import { createCourseDTO, updateCourseDTO } from "./courses.dto";
import { coursesRepository } from "./courses.repository";
import { Course } from "./entity/courses.entity";
import { unlink } from "node:fs/promises";

import { AppDataSource } from "../../databases/data-source";

import { steps } from "./entity/step.entity";

import { Image } from "./entity/Interface/image.entity";
import { Link } from "./entity/Interface/link.entity";
import { Research } from "./entity/Interface/research.entity";
import { Conference } from "./entity/Interface/conference.entity";
import { PathList_course } from "../courses_path/entity/pathList_course.entity";

export const createCourse_servise = async (
  data: createCourseDTO,
  files: Express.Multer.File[],
) => {
  try {
    return await AppDataSource.manager.transaction(async (manager) => {
      // Repositories
      const courseRepo = manager.getRepository(Course);
      const stepRepo = manager.getRepository(steps);
      const linkRepo = manager.getRepository(Link);
      const researchRepo = manager.getRepository(Research);
      const conferenceRepo = manager.getRepository(Conference);
      const imageRepo = manager.getRepository(Image);

      // Course cover image
      const courseImage = files.find(
        (file) => file.fieldname === "image_url",
      );

      if (!courseImage) {
        throw new AppError("تصویر دوره ارسال نشده است", 400);
      }

      // Create Course
      const course = courseRepo.create({
        title: data.title,
        description: data.description,
        image_ulr: `/uploads/${courseImage.filename}`,
        is_published: data.is_published,
      });

      await courseRepo.save(course);

      // Create Steps
      for (const [stepIndex, stepData] of data.steps.entries()) {
        const step = stepRepo.create({
          step_title: stepData.step_title,
          step_description: stepData.step_description,
          project_description: stepData.project_description,
          rules_description: stepData.rules_description,
          is_published: stepData.is_published,
          course: course,
        });

        await stepRepo.save(step);

        // Create Links
        for (const linkData of stepData.links ?? []) {
          const link = linkRepo.create({
            link_title: linkData.link_title,
            url: linkData.url,
            step: step,
          });

          await linkRepo.save(link);
        }

        // Create Research
        for (const researchData of stepData.Research ?? []) {
          const research = researchRepo.create({
            title: researchData.title,
            step: step,
          });

          await researchRepo.save(research);
        }

        // Create Conferences
        for (const conferenceData of stepData.Conference ?? []) {
          const conference = conferenceRepo.create({
            title: conferenceData.title,
            step: step,
          });

          await conferenceRepo.save(conference);
        }

        // Create Step Images
        const stepImages = files.filter(
          (file) => file.fieldname === `step_${stepIndex}_images`,
        );

        for (const imageFile of stepImages) {
          const image = imageRepo.create({
            url: `/uploads/${imageFile.filename}`,
            step: step,
          });

          await imageRepo.save(image);
        }
      }
      const cutopmResponse={
        id:course.id,
         title: course.title,
        description: course.description,
        image_ulr: `/uploads/${courseImage.filename}`,
        is_published: course.is_published,
      }
      return course;
    });
  } catch (error) {
    // Delete uploaded files if transaction fails
    await Promise.allSettled(
      files.map((file) => unlink(file.path)),
    );

    throw error;
  }
};

// update course

export const updateCourse_service = async (
  id: number,
  data: updateCourseDTO,
  files: Express.Multer.File[] = [],
) => {
  let oldCoverImage: string | null = null;


  try {
    const result = await AppDataSource.manager.transaction(
      async (manager) => {
        // Repositories
        const courseRepo = manager.getRepository(Course);
        const stepRepo = manager.getRepository(steps);
        const imageRepo = manager.getRepository(Image);
        const linkRepo = manager.getRepository(Link);
        const researchRepo = manager.getRepository(Research);
        const conferenceRepo = manager.getRepository(Conference);

        // Find Course
        const course = await courseRepo.findOneBy({ id });

        if (!course) {
          throw new AppError("Course not found", 404);
        }

        // Update Course fields
        const updateData: Partial<Course> = {};

        if (data.title !== undefined) {
          updateData.title = data.title;
        }

        if (data.description !== undefined) {
          updateData.description = data.description;
        }

        if (data.is_published !== undefined) {
          updateData.is_published = data.is_published;
        }

        // Update Course cover
        const coverImage = files.find(
          (file) => file.fieldname === "image_url",
        );

        if (coverImage) {
          oldCoverImage = course.image_ulr;
          updateData.image_ulr = `/uploads/${coverImage.filename}`;
        }

        if (Object.keys(updateData).length > 0) {
          await courseRepo.update({ id }, updateData);
        }

        // Update or create Steps
        if (data.steps !== undefined) {
          for (const [stepIndex, stepData] of data.steps.entries()) {
            let targetStep: steps;

            // Existing Step
            if (stepData.id !== undefined) {
              const existingStep = await stepRepo.findOne({
                where: {
                  id: stepData.id,
                  course: { id: course.id },
                },
              });

              if (!existingStep) {
                throw new AppError(
                  "Step not found in this course",
                  404,
                );
              }

              targetStep = existingStep;

              if (stepData.step_title !== undefined) {
                targetStep.step_title = stepData.step_title;
              }

              if (stepData.step_description !== undefined) {
                targetStep.step_description =
                  stepData.step_description;
              }

              if (stepData.project_description !== undefined) {
                targetStep.project_description =
                  stepData.project_description;
              }

              if (stepData.rules_description !== undefined) {
                targetStep.rules_description =
                  stepData.rules_description;
              }

              if (stepData.is_published !== undefined) {
                targetStep.is_published = stepData.is_published;
              }

              await stepRepo.save(targetStep);
            } else {
              // New Step
              if (
                !stepData.step_title ||
                !stepData.step_description ||
                stepData.is_published === undefined
              ) {
                throw new AppError(
                  "اطلاعات Step جدید ناقص است",
                  400,
                );
              }

              targetStep = stepRepo.create({
                step_title: stepData.step_title,
                step_description: stepData.step_description,
                project_description:
                  stepData.project_description ?? null,
                rules_description:
                  stepData.rules_description ?? null,
                is_published: stepData.is_published,
                course: course,
              });

              await stepRepo.save(targetStep);
            }

            // Update or create Links
            if (stepData.links !== undefined) {
              for (const linkData of stepData.links) {
                if (linkData.id !== undefined) {
                  const existingLink = await linkRepo.findOne({
                    where: {
                      id: linkData.id,
                      step: { id: targetStep.id },
                    },
                  });

                  if (!existingLink) {
                    throw new AppError(
                      "Link not found in this step",
                      404,
                    );
                  }

                  if (linkData.link_title !== undefined) {
                    existingLink.link_title = linkData.link_title;
                  }

                  if (linkData.url !== undefined) {
                    existingLink.url = linkData.url;
                  }

                  await linkRepo.save(existingLink);
                } else {
                  if (!linkData.link_title || !linkData.url) {
                    throw new AppError(
                      "اطلاعات Link جدید ناقص است",
                      400,
                    );
                  }

                  const newLink = linkRepo.create({
                    link_title: linkData.link_title,
                    url: linkData.url,
                    step: targetStep,
                  });

                  await linkRepo.save(newLink);
                }
              }
            }

            // Update or create Research
            if (stepData.Research !== undefined) {
              for (const researchData of stepData.Research) {
                if (researchData.id !== undefined) {
                  const existingResearch =
                    await researchRepo.findOne({
                      where: {
                        id: researchData.id,
                        step: { id: targetStep.id },
                      },
                    });

                  if (!existingResearch) {
                    throw new AppError(
                      "Research not found in this step",
                      404,
                    );
                  }

                  if (researchData.title !== undefined) {
                    existingResearch.title = researchData.title;
                  }

                  await researchRepo.save(existingResearch);
                } else {
                  if (!researchData.title) {
                    throw new AppError(
                      "عنوان Research جدید الزامی است",
                      400,
                    );
                  }

                  const newResearch = researchRepo.create({
                    title: researchData.title,
                    step: targetStep,
                  });

                  await researchRepo.save(newResearch);
                }
              }
            }

            // Update or create Conference
            if (stepData.Conference !== undefined) {
              for (const conferenceData of stepData.Conference) {
                if (conferenceData.id !== undefined) {
                  const existingConference =
                    await conferenceRepo.findOne({
                      where: {
                        id: conferenceData.id,
                        step: { id: targetStep.id },
                      },
                    });

                  if (!existingConference) {
                    throw new AppError(
                      "Conference not found in this step",
                      404,
                    );
                  }

                  if (conferenceData.title !== undefined) {
                    existingConference.title =
                      conferenceData.title;
                  }

                  await conferenceRepo.save(existingConference);
                } else {
                  if (!conferenceData.title) {
                    throw new AppError(
                      "عنوان Conference جدید الزامی است",
                      400,
                    );
                  }

                  const newConference = conferenceRepo.create({
                    title: conferenceData.title,
                    step: targetStep,
                  });

                  await conferenceRepo.save(newConference);
                }
              }
            }

            // Add Step Images
            const imageFieldName =
              stepData.id !== undefined
                ? `step_${targetStep.id}_images`
                : `new_step_${stepIndex}_images`;

            const stepImages = files.filter(
              (file) => file.fieldname === imageFieldName,
            );

            const existingImagesCount = await imageRepo.count({
              where: {
                step: { id: targetStep.id },
              },
            });

            if (existingImagesCount + stepImages.length > 10) {
              throw new AppError(
                "هر Step حداکثر می‌تواند ۱۰ تصویر داشته باشد",
                400,
              );
            }

            for (const imageFile of stepImages) {
              const newImage = imageRepo.create({
                url: `/uploads/${imageFile.filename}`,
                step: targetStep,
              });

              await imageRepo.save(newImage);
            }
          }
        }

        return "course updated";
      },
    );

    // Delete old cover after successful transaction
    if (oldCoverImage) {
      const filename = path.basename(oldCoverImage);

      const filePath = path.resolve(
        process.cwd(),
        "backend/upload",
        filename,
      );

      await unlink(filePath).catch(() => {});
    }

    return result;
  } catch (error) {
    // Delete newly uploaded files if transaction fails
    await Promise.allSettled(
      files.map((file) => unlink(file.path)),
    );

    throw error;
  }
};



export const deleteCourse_service = async (id: number) => {
  const course = await coursesRepository.findOneBy({ id });

  if (!course) {
    throw new AppError("course not found", 404);
  }

  // نگهداری آدرس تصاویر برای حذف فایل‌های فیزیکی
  let stepImageUrls: string[] = [];

  await AppDataSource.manager.transaction(async (manager) => {
    // 1. حذف کامل ارتباط Course با PathListها
    await manager.getRepository(PathList_course).delete({
      coursesId: id,
    });

    // 2. دریافت Stepهای مربوط به Course و تصاویر آن‌ها
    const stepRepository = manager.getRepository(steps);

    const courseSteps = await stepRepository.find({
      where: { course: { id } },
      relations: {
        image: true,
      },
    });

    const stepIds = courseSteps.map((step) => step.id);

    // ذخیره آدرس تصاویر برای حذف فیزیکی بعد از Transaction
    stepImageUrls = courseSteps.flatMap((step) =>
      step.image.map((image) => image.url),
    );

    // 3. حذف وابستگی‌های Stepها
    for (const stepId of stepIds) {
      await manager.getRepository(Image).delete({
        step: { id: stepId },
      });

      await manager.getRepository(Link).delete({
        step: { id: stepId },
      });

      await manager.getRepository(Research).delete({
        step: { id: stepId },
      });

      await manager.getRepository(Conference).delete({
        step: { id: stepId },
      });
    }

    // 4. حذف نرم Stepها
    for (const stepId of stepIds) {
      await stepRepository.softDelete(stepId);
    }

    // 5. حذف نرم Course
    await manager.getRepository(Course).softDelete(id);
  });

  // 6. حذف فایل‌های فیزیکی بعد از موفقیت Transaction
  const filesToDelete = [
    course.image_ulr,
    ...stepImageUrls,
  ].filter((url): url is string => Boolean(url));

  await Promise.allSettled(
    filesToDelete.map((url) => {
      const filename = path.basename(url);

      const filePath = path.resolve(
        process.cwd(),
        "backend/upload",
        filename,
      );

      return unlink(filePath);
    }),
  );

  return "course deleted successfully";
};



const deleteImageFile = async (url: string) => {
  const filename = path.basename(url);

  const filePath = path.resolve(
    process.cwd(),
    "backend/upload",
    filename,
  );

  await unlink(filePath).catch(() => {});
};
export const deleteStep_service = async (
  courseId: number,
  stepId: number,
) => {
  let imageUrls: string[] = [];

  await AppDataSource.manager.transaction(async (manager) => {
    const stepRepository = manager.getRepository(steps);

    const step = await stepRepository.findOne({
      where: {
        id: stepId,
        course: { id: courseId },
      },
      relations: {
        image: true,
      },
    });

    if (!step) {
      throw new AppError("step not found", 404);
    }

    imageUrls = step.image.map((image) => image.url);

    await manager.getRepository(Image).delete({
      step: { id: stepId },
    });

    await manager.getRepository(Link).delete({
      step: { id: stepId },
    });

    await manager.getRepository(Research).delete({
      step: { id: stepId },
    });

    await manager.getRepository(Conference).delete({
      step: { id: stepId },
    });

    await stepRepository.softDelete(stepId);
  });

  await Promise.allSettled(
    imageUrls.map((url) => deleteImageFile(url)),
  );

  return "step deleted successfully";
};
export const deleteLink_service = async (
  stepId: number,
  linkId: number,
) => {
  const linkRepository = AppDataSource.getRepository(Link);

  const link = await linkRepository.findOne({
    where: {
      id: linkId,
      step: { id: stepId },
    },
  });

  if (!link) {
    throw new AppError("link not found", 404);
  }

  await linkRepository.delete(linkId);

  return "link deleted successfully";
};
export const deleteResearch_service = async (
  stepId: number,
  researchId: number,
) => {
  const researchRepository = AppDataSource.getRepository(Research);

  const research = await researchRepository.findOne({
    where: {
      id: researchId,
      step: { id: stepId },
    },
  });

  if (!research) {
    throw new AppError("research not found", 404);
  }

  await researchRepository.delete(researchId);

  return "research deleted successfully";
};
export const deleteConference_service = async (
  stepId: number,
  conferenceId: number,
) => {
  const conferenceRepository =
    AppDataSource.getRepository(Conference);

  const conference = await conferenceRepository.findOne({
    where: {
      id: conferenceId,
      step: { id: stepId },
    },
  });

  if (!conference) {
    throw new AppError("conference not found", 404);
  }

  await conferenceRepository.delete(conferenceId);

  return "conference deleted successfully";
};
export const deleteImage_service = async (
  stepId: number,
  imageId: number,
) => {
  const imageRepository = AppDataSource.getRepository(Image);

  const image = await imageRepository.findOne({
    where: {
      id: imageId,
      step: { id: stepId },
    },
  });

  if (!image) {
    throw new AppError("image not found", 404);
  }

  await imageRepository.delete(imageId);

  await deleteImageFile(image.url);

  return "image deleted successfully";
};
export const getAllCourse_service = async () => {
  const paths = await coursesRepository.find();
  return paths;
};

export const getCourseById_service = async (id: number) => {
  const course = await coursesRepository.findOne({
    where: { id },
relations: {
  steps: {
    image: true,
    links: true,
    Research: true,
    Conference: true,
  },
}
  });

  if (!course) {
    throw new AppError("course not found", 404);
  }

  return course;
};