import z from "zod";
import { isPublished } from "../path/entity/path.entity";

export const createCourseSchema = z.object({
  title: z.string().min(1).max(100),

  description: z.string().min(1).max(5000),

  is_published: z.enum(isPublished),

  steps: z
    .array(
      z.object({
        step_title: z.string().min(1).max(60),

        step_description: z.string().min(1),

        project_description: z.string().max(150).nullable().optional(),

        rules_description: z.string().max(150).nullable().optional(),

        is_published: z.enum(isPublished),

        links: z
          .array(
            z.object({
              link_title: z.string().min(1).max(60),
              url: z.string().url(),
            }),
          )
          .optional()
          .default([]),

        Research: z
          .array(
            z.object({
              title: z.string().min(1),
            }),
          )
          .optional()
          .default([]),

        Conference: z
          .array(
            z.object({
              title: z.string().min(1),
            }),
          )
          .optional()
          .default([]),
      }),
    )
    .default([]),
});

export const updateCourseSchema = z.object({
  title: z.string().min(1).max(100).optional(),

  description: z.string().min(1).max(5000).optional(),

  image_url: z
    .url()
    .nullable()
    .optional()
    .or(z.literal("").transform(() => null)),

  is_published: z.enum(isPublished).optional(),

  steps: z.array(
    z.object({
      id: z.number().int().positive().optional(),

      step_title: z.string().min(1).max(60).optional(),
      step_description: z.string().min(1).optional(),

      project_description: z.string().max(150).nullable().optional(),
      rules_description: z.string().max(150).nullable().optional(),

      is_published: z.enum(isPublished).optional(),

      links: z.array(
        z.object({
          id: z.number().int().positive().optional(),
          link_title: z.string().min(1).max(60).optional(),
          url: z.string().url().optional(),
        }),
      ).optional(),

      Research: z.array(
        z.object({
          id: z.number().int().positive().optional(),
          title: z.string().min(1).optional(),
        }),
      ).optional(),

      Conference: z.array(
        z.object({
          id: z.number().int().positive().optional(),
          title: z.string().min(1).optional(),
        }),
      ).optional(),
    }),
  ).optional(),
});
