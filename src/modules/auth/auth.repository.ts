import { prisma } from "../../lib/prisma";
import { RegisterInput } from "./auth.validation";

const findByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const create = (data: RegisterInput) => {
  return prisma.user.create({
    data,
  });
};

export const authRepository = {
  findByEmail,
  create,
};
