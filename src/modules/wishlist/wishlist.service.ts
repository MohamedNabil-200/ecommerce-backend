import { wishlistRepository } from "./wishlist.repository";
import { productRepository } from "../products/product.repository";
import { AppError } from "../../utils/app-error";

const getWishlist = (userId: number) => {
  return wishlistRepository.getWishlistByUserId(userId);
};

const addProduct = async (userId: number, productId: number) => {
  const product = await productRepository.getById(productId);

  if (!product) {
    throw new AppError("Product Not Found", 404);
  }

  const existingWishlistItem = await wishlistRepository.findByUserAndProduct(
    userId,
    productId,
  );

  if (existingWishlistItem) {
    throw new AppError("Product already in wishlist", 409);
  }

  return wishlistRepository.create(userId, productId);
};

const removeProduct = async (userId: number, productId: number) => {
  const wishlistItem = await wishlistRepository.findByUserAndProduct(
    userId,
    productId,
  );

  if (!wishlistItem) {
    throw new AppError("Wishlist item not found", 404);
  }

  await wishlistRepository.remove(userId, productId);

  return { productId };
};

export const wishlistService = {
  getWishlist,
  addProduct,
  removeProduct,
};
