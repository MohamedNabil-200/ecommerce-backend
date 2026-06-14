import { prisma } from "../../lib/prisma";

const getAll = async () => {
  return prisma.product.findMany();
};

const getById = (id: number) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const productRepository = {
  getAll,
  getById,
};
