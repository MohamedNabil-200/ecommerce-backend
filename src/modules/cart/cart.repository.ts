import { prisma } from "../../lib/prisma";

const getCartByUserId = (userId: number) => {
  return prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

const createCart = (userId: number) => {
  return prisma.cart.create({
    data: {
      userId,
    },
  });
};

const findCartItem = (cartId: number, productId: number) => {
  return prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
  });
};

const createCartItem = (cartId: number, productId: number) => {
  return prisma.cartItem.create({
    data: {
      cartId,
      productId,
    },
  });
};

const updateQuantity = (cartItemId: number, quantity: number) => {
  return prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity,
    },
  });
};

const removeCartItem = (cartItemId: number) => {
  return prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
};

const clearCart = (cartId: number) => {
  return prisma.cartItem.deleteMany({
    where: {
      cartId,
    },
  });
};

export const cartRepository = {
  getCartByUserId,
  createCart,
  findCartItem,
  createCartItem,
  updateQuantity,
  removeCartItem,
  clearCart,
};
