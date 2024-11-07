const {z}=require('zod');

const employeeSchema=z.object({
    name: z
   .string({required_error:"Name is required"})
   .trim(),
    email: z
   .string({required_error:"Email is required"})
   .trim()
   .email({message: "Invalid email address"}),
    gender: z.string({required_error:"Gender is required"}),
    phone: z.string({required_error:"Phone is required"})
    .min(10, {message: "phone number must be at least of 10 characters"})
    .max(10, {message: "phone number must be 10 characters"}),
    designation: z.string({required_error:"Designation is required"}),
    course:z.string({required_error:"Course is required"}),
    image: z.string({required_error: "image is required"}),
})

module.exports=employeeSchema;