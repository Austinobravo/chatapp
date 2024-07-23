import { z } from "zod"

const passwordSchema = z.string()
.min(6, {message: "This field must have more than 6 characters"})
.max(50, {message: "Your password exceeded the limit"})
// .refine((password) => /^[a-z0-9]+$/i.test(password), {message: "This field must have a Uppercase, Lowercase, Number, Special Character"})
.refine((password) => /[A-Z]/.test(password), {message: "This field must have a CapitalCase letter"})
.refine((password) => /[a-z]/.test(password), {message: "This field must have a LowerCase letter"})
.refine((password) => /[0-9]/.test(password), {message: "This field must have a Number"})
.refine((password) => /[!@#$%^&*]/.test(password), {message: "This field must have a Special Character"})

export const formSchema = z.object({
    username: z.string().min(1, {message: "This field is mandatory"}).max(50, {message: "Your username exceeded the limit"}),
    password: passwordSchema,
    email: z.string().min(1, {message: "This field is mandatory"}).email("Please provide a valid email."),
    confirm_password: z.string().min(6, {message: "This field must have more than 6 characters"}).max(50, {message: "Your password exceeded the limit"}),
}).refine((data) => data.password === data.confirm_password, {path:['confirm_password'], message: "Passwords do not match"})
