import { prisma } from "../../lib/prisma";

const createOrder = (userId: number, subtotal: number) => {
  return prisma.order.create({
    data: {
      userId,
      subtotal,
    },
  });
};

const createOrderItems = (
  items: {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
  }[],
) => {
  return prisma.orderItem.createMany({
    data: items,
  });
};

const getOrdersByUserId = (userId: number) => {
  return prisma.order.findMany({
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

const getOrderById = (orderId: number) => {
  return prisma.order.findUnique({
    where: {
      id: orderId,
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

export const orderRepository = {
  createOrder,
  createOrderItems,
  getOrdersByUserId,
  getOrderById,
};
