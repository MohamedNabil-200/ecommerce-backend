import { productRepository } from "./product.repository";

const getAll = async () => {
  return productRepository.getAll();
};

const getById = async (id: number) => {
  return productRepository.getById(id);
};

export const productService = {
  getAll,
  getById,
};
