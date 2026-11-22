import { z } from "zod";
import { isPublished } from "./entity/path.entity";

export const pathCreateSchema = z.object({
  key: z.string().min(1).max(50),
  title: z.string().min(1).max(50),
  description: z.string().min(20).max(500),
  image_url: z.url().nullable().optional()
        .or(z.literal("").transform(() => null)),
  is_published: z.enum(isPublished),
});
