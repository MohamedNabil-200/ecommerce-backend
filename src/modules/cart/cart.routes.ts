import { Router } from "express";
import { cartController } from "./cart.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import { productIdParamsSchema, updateQuantitySchema } from "./cart.validation";

const router = Router();
router.use(authenticateMiddleware);

router.get("/", cartController.getCart);

router.post(
  "/:productId",
  validate({ params: productIdParamsSchema }),
  cartController.addProduct,
);

router.patch(
  "/:productId",
  validate({ params: productIdParamsSchema, body: updateQuantitySchema }),
  cartController.updateProductQuantity,
);

router.delete(
  "/:productId",
  validate({ params: productIdParamsSchema }),
  cartController.removeProduct,
);

router.delete("/", cartController.clearCart);

export default router;
