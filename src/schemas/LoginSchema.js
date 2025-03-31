import { z } from "zod";

export const loginSchema = z.object({
    login: z
        .string()
        .min(1, "Forneça um login"),
    password: z
    .string()
    .min(1, "Forneça uma senha")
})