import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { productService } from "./product.service";
import { CreateProductInput, UpdateProductInput } from "./product.types";

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

const create = asyncHandler(async (req: Request, res: Response) => {
  const data: CreateProductInput = req.body;
  const createdProduct = await productService.create(data);

  res.status(201).json({
    success: true,
    message: "Product created Successfully",
    data: createdProduct,
  });
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const data: UpdateProductInput = req.body;
  const id = Number(req.params.id);
  const updatedProduct = await productService.update(id, data);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deletedProduct = await productService.remove(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: {id: deletedProduct.id},
  });
});

export const productController = { getAll, getById, create, update, remove };
