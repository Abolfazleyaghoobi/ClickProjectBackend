import z from "zod";
import { isPublished } from "../path/entity/path.entity";

export const createCourseSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(5000),
  image_url: z
    .url()
    .nullable()
    .optional()
    .or(z.literal("").transform(() => null)),
  is_published: z.enum(isPublished),
});

export const updateCourseSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(5000).optional(),
  image_url: z
    .url()
    .nullable()
    .optional()
    .or(z.literal("").transform(() => null)),
  is_published: z.enum(isPublished),
});
