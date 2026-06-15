import express from "express";
import cors from "cors";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import  productRoutes  from "./modules/products/product.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server Running",
  });
});

app.use("/api/products", productRoutes)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
