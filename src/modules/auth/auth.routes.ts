import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerSchema } from "./auth.validation";
import { loginSchema } from "./login.validation";

const router = Router();

router.post(
  "/register",
  validate({ body: registerSchema }),
  authController.register,
);

router.post("/login", validate({ body: loginSchema }), authController.login);

export default router;
