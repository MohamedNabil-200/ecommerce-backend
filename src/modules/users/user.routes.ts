import { Router } from "express";
import { userController } from "./user.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";

const router = Router();

router.get("/profile", authenticateMiddleware, userController.getProfile);

export default router;
