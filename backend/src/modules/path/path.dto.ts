import { isPublished } from "./entity/path.entity";

export interface PathCreateDTO {
  key: string;
  title: string;
  description: string;
image_url?: string | null;
  is_published: isPublished;
}