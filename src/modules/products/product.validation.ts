import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
  imageUrl: z.string().trim().url("Image URL must be a valid URL"),
  categoryId: z.coerce
    .number()
    .int("Category id must be an integer")
    .positive("Category id must be greater than 0"),
  isActive: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const productParamsSchema = z.object({
  id: z.coerce
    .number()
    .int("Product id must be an integer")
    .positive("Product id must be greater than 0"),
});
