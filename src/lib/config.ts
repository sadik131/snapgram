import { z } from "zod"

export const SigninForm = z.object({
    username: z.string().min(2, { message: "Name is Too Short" }).max(50),
    email: z.string(),
    password: z.string().min(8, { message: "password is Too Short" }).max(50),
})