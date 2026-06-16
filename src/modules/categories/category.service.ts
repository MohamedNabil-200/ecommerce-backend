import { categoryRepository } from "./category.repository";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.validation";
import { AppError } from "../../utils/app-error";

const getAll = async () => {
  return categoryRepository.getAll();
};

const getById = async (id: number) => {
  const category = await categoryRepository.getById(id);

  if (!category) {
    throw new AppError("Category Not Found", 404);
  }

  return category;
};

const create = async (data: CreateCategoryInput) => {
  return categoryRepository.create(data);
};

const update = async (id: number, data: UpdateCategoryInput) => {
  const hasAnyField = Object.values(data).some((value) => value !== undefined);

  if (!hasAnyField) {
    throw new AppError("At least one field is required for update", 400);
  }

  const category = await categoryRepository.getById(id);

  if (!category) {
    throw new AppError("Category Not Found", 404);
  }

  return categoryRepository.update(id, data);
};

const remove = async (id: number) => {
  const category = await categoryRepository.getById(id);

  if (!category) {
    throw new AppError("Category Not Found", 404);
  }

  await categoryRepository.remove(id);

  return category;
};

export const categoryService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
