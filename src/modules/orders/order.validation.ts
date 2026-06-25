import { z } from "zod";

export const orderIdParamsSchema = z.object({
  orderId: z.coerce.number().int().positive(),
});
