import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { cartService } from "./cart.service";

const getCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const cart = await cartService.getCart(userId);

  res.status(200).json({
    success: true,
    data: cart,
  });
});

const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const productId = Number(req.params.productId);
  const cartItem = await cartService.addProduct(userId, productId);

  res.status(201).json({
    success: true,
    message: "Product added to cart successfully",
    data: cartItem,
  });
});

const updateProductQuantity = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const productId = Number(req.params.productId);
  const { quantity } = req.body;

  const cartItem = await cartService.updateProductQuantity(
    userId,
    productId,
    quantity,
  );

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    data: cartItem,
  });
});

const removeProduct = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const productId = Number(req.params.productId);
  const removedItem = await cartService.removeProduct(userId, productId);

  res.status(200).json({
    success: true,
    message: "Product removed from cart successfully",
    data: removedItem,
  });
});

const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  await cartService.clearCart(userId);

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});

export const cartController = {
  getCart,
  addProduct,
  updateProductQuantity,
  removeProduct,
  clearCart,
};
