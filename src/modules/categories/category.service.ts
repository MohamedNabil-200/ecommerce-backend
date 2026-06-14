import { categoryRepository } from "./category.repository";

const getAll = async () => {
  return categoryRepository.getAll();
};

const getById = async (id: number) => {
  return categoryRepository.getById(id);
};

export const categoryService = {
  getAll,
  getById,
};
