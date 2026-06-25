import { Router } from "express";
import { orderController } from "./order.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { orderIdParamsSchema } from "./order.validation";

const router = Router();
router.use(authenticateMiddleware);

router.post("/", orderController.placeOrder);

router.get("/", orderController.getMyOrder);

router.get(
  "/:orderId",
  validate({ params: orderIdParamsSchema }),
  orderController.getOrderById,
);

export default router;
