import { AppError } from "../../utils/app-error";
import { productRepository } from "./product.repository";

const getAll = async () => {
  return productRepository.getAll();
};

const getById = async (id: number) => {
  const product = await productRepository.getById(id);

  if (!product) {
    throw new AppError("product not found", 404);
  }

  return product;
};

export const productService = {
  getAll,
  getById,
};
