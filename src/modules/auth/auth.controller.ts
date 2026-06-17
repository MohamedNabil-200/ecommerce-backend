import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { authService } from "./auth.service";
import { RegisterInput } from "./auth.validation";

const register = asyncHandler(async (req: Request, res: Response) => {
  const data: RegisterInput = req.body;

  const createdUser = await authService.register(data);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: createdUser,
  });
});

export const authController = {
  register,
};