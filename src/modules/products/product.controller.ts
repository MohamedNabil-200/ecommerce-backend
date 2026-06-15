import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { productService } from "./product.service";

const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const products = await productService.getAll();

  res.status(200).json({
    success: true,
    data: products,
  });
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product = await productService.getById(id);

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const productController = { getAll, getById };
