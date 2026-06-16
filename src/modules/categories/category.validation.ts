import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot be more than 100 characters"),
  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens",
    )
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug cannot be more than 100 characters"),
  imageUrl: z.string().trim().url("Image URL must be a valid URL"),
});

export const updateCategorySchema = createCategorySchema.partial();
export const categoryParamsSchema = z.object({
  id: z.coerce
    .number()
    .int("Category id must be an integer")
    .positive("Category id must be greater than 0"),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;