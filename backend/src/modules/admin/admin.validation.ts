import {z} from "zod"

export const LoginSchema = z.object({
    phone:z.string().max(11),
    password:z.string().max(6),
})

