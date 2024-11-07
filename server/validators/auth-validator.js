const {z}=require('zod');

const signUpSchema=z.object({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3, {message: "Name must be at least 3 characters"}),    
    email: z
    .string({required_error:"Email is required"})
    .email({message: "Invalid email address"})
    .trim(),
    password: z
    .string({required_error:"Password is required"})
    .min(7, {message: "Password must be at least of 7 characters"})
    .trim(),
});

const loginSchema=z.object({
    email: z
    .string({required_error:"Email is required"})
    .email({message: "Invalid email address"})
    .trim(),
    password: z
    .string({required_error:"Password is required"})
    .min(7, {message: "Password must be at least of 7 characters"})
    .trim(),
});

module.exports = signUpSchema;