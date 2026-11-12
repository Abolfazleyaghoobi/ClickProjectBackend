export interface  Register_interface{
  username:string;
  display_name:string;
  phone:string;
  password:string;
}
export interface Login_interface{
  username:string;
  password:string;
}


// update profile
export interface UpdateProfileDTO {
    display_name?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    banner_url?: string | null;
    github_url?: string | null;
    portolio_url?: string | null;
}


// update user account
export interface UpdateUserDTO {
    username?: string;
    phone?: string;
  
}

// get info user
export interface GetInfoUserDTO {
    id?: string;
    username?: string| string[];
}


// create project
export interface CreateProjectDTO {
    title: string;
    description: string | null;
    project_url: string | null;
}

// update project

export interface UpdateProjectDTO {
    title?: string;
    description?: string | null;
    project_url?: string | null;
}






