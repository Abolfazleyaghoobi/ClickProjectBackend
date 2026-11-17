import {z} from "zod"

export const LoginSchema = z.object({
    username:z.string().min(3).max(20),
    email:z.email().min(5).max(50),
})

