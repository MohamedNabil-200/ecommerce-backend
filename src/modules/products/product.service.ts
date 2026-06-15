import { AppError } from "../../utils/app-error";
import { productRepository } from "./product.repository";
import { CreateProductInput } from "./product.types";

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

const create = async (data: CreateProductInput) => {
  return productRepository.create(data);
};

export const productService = {
  getAll,
  getById,
  create,
};
