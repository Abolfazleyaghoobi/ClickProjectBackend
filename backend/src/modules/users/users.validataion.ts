import { z } from "zod";
// regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

// export const UserRoleSchema = z.enum(["user", "admin"]);

// export const UserStatusSchema = z.enum(["active", "inactive", "banned"]);

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(12),
  phone: z.string().regex(/^09\d{9}$/, "phone is invalid"),
  display_name: z.string().min(3).max(20),
  password: z.string().min(6).max(15).regex(passwordRegex, "Weak password"),
});

export const LoginUserSchema = z.object({
  username: z.string().min(3).max(12),

  password: z.string().min(6).max(15).regex(passwordRegex, "Weak password"),
}); 

export const UpdateProfileSchema = z.object({
    display_name: z.string().min(3).max(60).optional(),
    bio: z.string().optional(),

    avatar_url: z.string().url().nullable().optional()
        .or(z.literal("").transform(() => null)),

    banner_url: z.string().url().nullable().optional()
        .or(z.literal("").transform(() => null)),

    github_url: z.string().url().nullable().optional(),
    portolio_url: z.string().url().nullable().optional(),
});
export const UpdateAccountSchema = z.object({
     username: z.string().min(3).max(12).optional(),
    phone: z.string().regex(/^09\d{9}$/, "phone is invalid").optional(),
}).refine(
    (data) => Object.keys(data).length >= 1,
    {
        message: "At least one field must be provided",
    }
);


export const CreateProjectSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(300),
    project_url: z.string().url(),
});

export const UpdateProjectSchema = z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().max(300).optional(),
    project_url: z.string().url().optional(),
});