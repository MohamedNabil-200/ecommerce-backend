import { prisma } from "../../lib/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.validation";

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

const create = async (data: CreateCategoryInput) => {
  return prisma.category.create({
    data,
  });
};

const update = async (id: number, data: UpdateCategoryInput) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

const remove = async (id: number) => {
  return prisma.category.delete({
    where: { id },
  });
};

export const categoryRepository = {
  getAll,
  getById,
  create,
  update,
  remove,
};
