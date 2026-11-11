import {z} from "zod";

export const CreateAchivementSchema = z.object({
    key: z.string().min(3).max(50),
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(255),
    iconKey: z.string().min(3).max(50),
    conditionType: z.string().min(3).max(50),
    conditionValue: z.number().int().positive(),
    isActive: z.boolean().optional(),
});
export const UpdateAchivementSchema = z.object({
    key: z.string().min(3).max(50).optional(),
    title: z.string().min(3).max(100).optional(),
    description: z.string().min(3).max(255).optional(),
    iconKey: z.string().min(3).max(50).optional(),
    conditionType: z.string().min(3).max(50).optional(),
    conditionValue: z.number().int().positive().optional(),
    isActive: z.boolean().optional(),
}).refine(
    (data) => Object.keys(data).length >= 1,
    {
        message: "At least one field must be provided",
    }
);