import { Router } from "express";
import { wishlistController } from "./wishlist.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { productIdParamSchema } from "./wishlist.validation";

const router = Router();

router.use(authenticateMiddleware);

router.get("/", wishlistController.getWishlist);

router.post(
  "/:productId",
  validate({ params: productIdParamSchema }),
  wishlistController.addProduct,
);

router.delete(
  "/:productId",
  validate({ params: productIdParamSchema }),
  wishlistController.removeProduct,
);

export default router;
