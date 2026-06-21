import { prisma } from "../../lib/prisma";

const getWishlistByUserId = (userId: number) => {
  return prisma.wishlist.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });
};

const findByUserAndProduct = (userId: number, productId: number) => {
  return prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

const create = (userId: number, productId: number) => {
  return prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
  });
};

const remove = (userId: number, productId: number) => {
  return prisma.wishlist.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

export const wishlistRepository = {
  getWishlistByUserId,
  findByUserAndProduct,
  create,
  remove,
};
