import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { wishlistService } from "./wishlist.service";

const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const wishlist = await wishlistService.getWishlist(userId);

  res.status(200).json({
    success: true,
    data: wishlist,
  });
});

const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const productId = Number(req.params.productId);
  const wishlistItem = await wishlistService.addProduct(userId, productId);

  res.status(201).json({
    success: true,
    message: "Product added to wishlist successfully",
    data: wishlistItem,
  });
});

const removeProduct = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const productId = Number(req.params.productId);
  const removedItem = await wishlistService.removeProduct(userId, productId);

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist successfully",
    data: removedItem,
  });
});

export const wishlistController = {
  getWishlist,
  addProduct,
  removeProduct,
};
