import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerSchema } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validate({ body: registerSchema }),
  authController.register,
);

export default router;
