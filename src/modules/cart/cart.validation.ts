import { z } from "zod";

export const productIdParamsSchema = z.object({
  productId: z.coerce.number().int().positive(),
});

export const updateQuantitySchema = z.object({
  productId: z.coerce.number().int().positive(),
});
