import { AppError } from "../../utils/app-error";
import { productRepository } from "../products/product.repository";
import { cartRepository } from "./cart.repository";

const getCart = async (userId: number) => {
  const cart = await cartRepository.getCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is Empty", 404);
  }

  return cart;
};

const addProduct = async (userId: number, productId: number) => {
  const product = await productRepository.getById(productId);

  if (!product) {
    throw new AppError("Product Not Found", 404);
  }

  let cart = await cartRepository.getCartByUserId(userId);

  if (!cart) {
    await cartRepository.createCart(userId);
    cart = await cartRepository.getCartByUserId(userId);
  }

  if (!cart) {
    throw new AppError("Cart Not Found", 404);
  }

  const cartItem = await cartRepository.findCartItem(cart!.id, productId);
  if (!cartItem) {
    return cartRepository.createCartItem(cart!.id, productId);
  }

  return cartRepository.updateQuantity(cartItem.id, cartItem.quantity + 1);
};

const updateProductQuantity = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  const cart = await cartRepository.getCartByUserId(userId);

  if (!cart) {
    throw new AppError("Cart Not Found", 404);
  }

  const cartItem = await cartRepository.findCartItem(cart.id, productId);

  if (!cartItem) {
    throw new AppError("Cart Item Not Found", 404);
  }

  if (quantity <= 0) {
    return cartRepository.removeCartItem(cartItem.id);
  }

  return cartRepository.updateQuantity(cartItem.id, quantity);
};

const removeProduct = async (userId: number, productId: number) => {
  const cart = await cartRepository.getCartByUserId(userId);

  if (!cart) {
    throw new AppError("Cart Not Found", 404);
  }

  const cartItem = await cartRepository.findCartItem(cart.id, productId);

  if (!cartItem) {
    throw new AppError("Product Not Found", 404);
  }

  return cartRepository.removeCartItem(cartItem.id);
};

const clearCart = async (userId: number) => {
  const cart = await cartRepository.getCartByUserId(userId);

  if (!cart) {
    throw new AppError("Cart Not Found", 404);
  }

  return cartRepository.clearCart(cart.id);
};

export const cartService = {
  getCart,
  addProduct,
  updateProductQuantity,
  removeProduct,
  clearCart,
};
