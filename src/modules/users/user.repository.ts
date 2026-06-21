import { prisma } from "../../lib/prisma";

const findById = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const userRepository = { findById };
