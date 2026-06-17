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
    if (schemas.body) {
      const bodyResult = schemas.body.safeParse(req.body);

      if (!bodyResult.success) {
        throw new AppError(
          bodyResult.error.issues[0].message ?? "Invalid request body",
          400,
        );
      }
      req.body = bodyResult.data as Request["body"]; // Update req.body with the validated data
    }

    if (schemas.params) {
      const paramsResult = schemas.params.safeParse(req.params);

      if (!paramsResult.success) {
        throw new AppError(
          paramsResult.error.issues[0].message ?? "Invalid request params",
          400,
        );
      }
      req.params = paramsResult.data as Request["params"]; // Update req.params with the validated data
    }

    if (schemas.query) {
      const queryResult = schemas.query.safeParse(req.query);

      if (!queryResult.success) {
        throw new AppError(
          queryResult.error.issues[0].message ?? "Invalid request query",
          400,
        );
      }
      req.query = queryResult.data as Request["query"]; // Update req.query with the validated data
    }

    next();
  };
