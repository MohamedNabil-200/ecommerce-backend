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

export const productRepository = {
  getAll,
  getById,
  create,
  update,
};
