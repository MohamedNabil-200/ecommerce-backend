import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email must be a valid email").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
