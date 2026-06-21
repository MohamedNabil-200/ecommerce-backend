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

  try {
    return await wishlistRepository.create(userId, productId);
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new AppError("Product already in wishlist", 409);
    }
    throw error;
  }
};

const removeProduct = async (userId: number, productId: number) => {
  try {
    await wishlistRepository.remove(userId, productId);
  } catch (error: any) {
    if (error?.code === "P2025") {
      throw new AppError("Wishlist item not found", 404);
    }
    throw error;
  }

  return { productId };
};

export const wishlistService = {
  getWishlist,
  addProduct,
  removeProduct,
};
