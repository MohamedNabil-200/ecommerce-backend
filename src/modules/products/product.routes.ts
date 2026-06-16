import { Router } from "express";
import { productController } from "./product.controller";
import {
  createProductSchema,
  productParamsSchema,
  updateProductSchema,
} from "./product.validation";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.get("/", productController.getAll);
router.get(
  "/:id",
  validate({ params: productParamsSchema }),
  productController.getById,
);

router.post(
  "/",
  validate({
    body: createProductSchema,
  }),
  productController.create,
);

router.patch(
  "/:id",
  validate({ params: productParamsSchema, body: updateProductSchema }),
  productController.update,
);

router.delete(
  "/:id",
  validate({ params: productParamsSchema }),
  productController.remove,
);

export default router;
