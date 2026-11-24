import { isPublished } from "../path/entity/path.entity";

export interface createCourseDTO{
    title:string;
    description:string;
    image_url?: string | null;

    is_published:isPublished;
}

export interface updateCourseDTO{
    title?:string;
    description?:string;
    image_url?: string | null;

    is_published?:isPublished;
}

