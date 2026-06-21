import { Request, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { verifyAccessToken } from "../utils/jwt";

export const authenticateMiddleware = (req: Request, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new AppError("Authentication required", 401);
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new AppError("Authentication required", 401);
  }

  try {
    const payload = verifyAccessToken(token);

    if (typeof payload === "string") {
      throw new AppError("Invalid or expired token", 401);
    }

    req.user = {
      id: Number(payload.sub),
      role: payload.role,
    };
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }

  next();
};
