import { prisma } from "../../lib/prisma";

const getAll = async () => {
  return prisma.category.findMany();
};

const getById = async (id: number) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

export const categoryRepository = {
  getAll,
  getById,
};