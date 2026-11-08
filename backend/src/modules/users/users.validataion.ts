import { z } from "zod";
// regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

// export const UserRoleSchema = z.enum(["user", "admin"]);

// export const UserStatusSchema = z.enum(["active", "inactive", "banned"]);

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(12),
  phone: z.string().regex(/^09\d{9}$/, "phone is invalid"),
  display_name: z.string().min(3).max(12),
  password: z.string().min(6).max(15).regex(passwordRegex, "Weak password"),
});

export const LoginUserSchema = z.object({
  username: z.string().min(3).max(12),

  password: z.string().min(6).max(15).regex(passwordRegex, "Weak password"),
});

export const UpdateProfileSchema = z.object({
    display_name: z.string().min(3).max(60).optional(),
    bio: z.string().optional(),
    avatar_url: z.string().url().optional(),
    banner_url: z.string().url().optional(),
}).refine(
    (data) => Object.keys(data).length >= 1,
    {
        message: "At least one field must be provided",
    }
);

export const UpdateAccountSchema = z.object({
     username: z.string().min(3).max(12).optional(),
    phone: z.string().regex(/^09\d{9}$/, "phone is invalid").optional(),
}).refine(
    (data) => Object.keys(data).length >= 1,
    {
        message: "At least one field must be provided",
    }
);