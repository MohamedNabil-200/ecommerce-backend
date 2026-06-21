import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { verifyAccessToken } from "../utils/jwt";

export const authenticateMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
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
    if (
      error instanceof Error &&
      error.message === "JWT_SECRET environment variable is required"
    ) {
      throw error;
    }
    throw new AppError("Invalid or expired token", 401);
  }

  next();
};
