import { Router } from "express";
import { categoryController } from "./category.controller";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryParamsSchema,
} from "./category.validation";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.get("/", categoryController.getAll);
router.get(
  "/:id",
  validate({ params: categoryParamsSchema }),
  categoryController.getById,
);

router.post(
  "/",
  validate({ body: createCategorySchema }),
  categoryController.create,
);

router.patch(
  "/:id",
  validate({
    params: categoryParamsSchema,
    body: updateCategorySchema,
  }),
  categoryController.update,
);

router.delete(
  "/:id",
  validate({ params: categoryParamsSchema }),
  categoryController.remove,
);

export default router;
