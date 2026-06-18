import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { authService } from "./auth.service";
import { RegisterInput } from "./auth.validation";
import { LoginInput } from "./login.validation";

const register = asyncHandler(async (req: Request, res: Response) => {
  const data: RegisterInput = req.body;

  const createdUser = await authService.register(data);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: createdUser,
  });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const data: LoginInput = req.body;

  const result = await authService.login(data);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const authController = {
  register,
  login,
};
