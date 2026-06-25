import { orderRepository } from "./order.repository";
import { cartRepository } from "../cart/cart.repository";
import { AppError } from "../../utils/app-error";
import { productRepository } from "../products/product.repository";

const placeOrder = async (userId: number) => {
  const cart = await cartRepository.getCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  for (const item of cart.items) {
    console.log("quantity:", item.quantity, "stock:", item.product.stock);
    if (item.quantity > item.product.stock) {
      console.log("INSUFFICIENT STOCK");
      throw new AppError(`Insufficient  stock for ${item.product.title}`, 400);
    }
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  const order = await orderRepository.placeOrder(userId, subtotal);

  const orderItems = cart.items.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: Number(item.product.price),
  }));

  await orderRepository.createOrderItems(orderItems);

  for (const item of cart.items) {
    await productRepository.decrementStock(item.productId, item.quantity);
  }

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
