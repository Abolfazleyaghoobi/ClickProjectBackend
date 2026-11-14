import {z} from "zod";

export const createCertificateTypeSchema = z.object({
    key:z.string().min(1).max(20),
    title:z.string().min(1).max(50),
    iconKey:z.string().min(1).max(20),
    color:z.string().min(1).max(20),
    isActive:z.boolean()
})

export const updateCertificateTypeSchema = z.object({
    key:z.string().min(1).max(20).optional(),
    title:z.string().min(1).max(50).optional(),
    iconKey:z.string().min(1).max(20).optional(),
    color:z.string().min(1).max(20).optional(),
    isActive:z.boolean().optional()
})
