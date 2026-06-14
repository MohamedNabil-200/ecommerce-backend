import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new AppError("Resource Not Found", 404))
};
