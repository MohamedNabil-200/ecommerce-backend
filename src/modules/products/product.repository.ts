import { prisma } from "../../lib/prisma";
import { CreateProductInput, UpdateProductInput } from "./product.types";

const getAll = async () => {
  return prisma.product.findMany();
};

const getById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

const create = async (data: CreateProductInput) => {
  return prisma.product.create({ data });
};

const update = async (id: number, data: UpdateProductInput) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

const decrementStock = (productId: number, quantity: number) => {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  });
};

const remove = async (id: number) => {
  return prisma.product.delete({
    where: { id },
  });
};

export const productRepository = {
  getAll,
  getById,
  create,
  update,
  decrementStock,
  remove,
};
