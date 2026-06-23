import express from "express";
import cors from "cors";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import productRoutes from "./modules/products/product.routes";
import categoryRouter from "./modules/categories/category.routes";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import wishlistRoutes from "./modules/wishlist/wishlist.routes";
import cartRoutes from "./modules/cart/cart.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server Running",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRouter);

// Auth
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Wishlist
app.use("/api/wishlist", wishlistRoutes);

// Cart
app.use("/api/cart", cartRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
