import { prisma } from "../../lib/prisma";
import { CreateProductInput } from "./product.types";

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

export const productRepository = {
  getAll,
  getById,
  create,
};
