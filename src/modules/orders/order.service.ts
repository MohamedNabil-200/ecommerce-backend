import { orderRepository } from "./order.repository";
import { cartRepository } from "../cart/cart.repository";
import { AppError } from "../../utils/app-error";

const placeOrder = async (userId: number) => {
  const cart = await cartRepository.getCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  const order = await orderRepository.createOrder(userId, subtotal);

  const orderItems = cart.items.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: Number(item.product.price),
  }));

  await orderRepository.createOrderItems(orderItems);

  await cartRepository.clearCart(cart.id);

  return orderRepository.getOrderById(order.id);
};

const getMyOrders = async (userId: number) => {
  return orderRepository.getOrdersByUserId(userId);
};

const getOrderById = async (userId: number, orderId: number) => {
  const order = await orderRepository.getOrderById(orderId);

  if (!order) {
    throw new AppError("Order Not Found", 404);
  }

  if (order.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return order;
};

export const orderService = {
  placeOrder,
  getMyOrders,
  getOrderById,
};
