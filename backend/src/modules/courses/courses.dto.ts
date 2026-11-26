import { isPublished } from "../path/entity/path.entity";




interface CreateLinkDTO {
  link_title: string;
  url: string;
}

interface CreateResearchDTO {
  title: string;
}

interface CreateConferenceDTO {
  title: string;
}

interface CreateStepDTO {
  step_title: string;
  step_description: string;
  project_description?: string | null;
  rules_description?: string | null;
  is_published: isPublished;

  links?: CreateLinkDTO[];
  Research?: CreateResearchDTO[];
  Conference?: CreateConferenceDTO[];
}

export interface createCourseDTO {
  title: string;
  description: string;
  is_published: isPublished;

  steps: CreateStepDTO[];
}

interface UpdateLinkDTO {
  id?: number;
  link_title?: string;
  url?: string;
}

interface UpdateResearchDTO {
  id?: number;
  title?: string;
}

interface UpdateConferenceDTO {
  id?: number;
  title?: string;
}

interface UpdateStepDTO {
  id?: number;

  step_title?: string;
  step_description?: string;
  project_description?: string | null;
  rules_description?: string | null;
  is_published?: isPublished;

  links?: UpdateLinkDTO[];
  Research?: UpdateResearchDTO[];
  Conference?: UpdateConferenceDTO[];
}

export interface updateCourseDTO {
  title?: string;
  description?: string;
  image_url?: string | null;
  is_published?: isPublished;

  steps?: UpdateStepDTO[];
}