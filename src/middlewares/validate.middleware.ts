import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

type ValidationSchemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export const validate =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    const bodyResult = schemas.body?.safeParse(req.body);

    if (bodyResult && !bodyResult.success) {
      throw new AppError(
        bodyResult.error.issues[0].message ?? "Invalid request body",
        400,
      );
    }

    const paramsResult = schemas.params?.safeParse(req.params);

    if (paramsResult && !paramsResult.success) {
      throw new AppError(
        paramsResult.error.issues[0].message ?? "Invalid request params",
        400,
      );
    }

    const queryResult = schemas.query?.safeParse(req.query);

    if (queryResult && !queryResult.success) {
      throw new AppError(
        queryResult.error.issues[0].message ?? "Invalid request query",
        400,
      );
    }

    next();
  };
