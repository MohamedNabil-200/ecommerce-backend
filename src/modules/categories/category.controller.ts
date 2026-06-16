import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { categoryService } from "./category.service";
import { CreateCategoryInput, UpdateCategoryInput } from "./category.validation";

const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await categoryService.getAll();

  res.status(200).json({
    success: true,
    data: categories,
  });
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = await categoryService.getById(id);

  res.status(200).json({
    success: true,
    data: category,
  });
});

const create = asyncHandler(async (req: Request, res: Response) => {
  const data: CreateCategoryInput = req.body;
  const createdCategory = await categoryService.create(data);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: createdCategory,
  });
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const data: UpdateCategoryInput = req.body;
  const id = Number(req.params.id);
  const updatedCategory = await categoryService.update(id, data);

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deletedCategory = await categoryService.remove(id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    data: { id: deletedCategory.id },
  });
});

export const categoryController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
