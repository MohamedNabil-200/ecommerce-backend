import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { userService } from "./user.service";

const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const profile = await userService.getProfile(userId);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

export const userController = {
  getProfile,
};
