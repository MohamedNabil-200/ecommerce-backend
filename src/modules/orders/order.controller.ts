import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { orderService } from "./order.service";
import { success } from "zod";

const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const order = await orderService.placeOrder(userId);

  res.status(200).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

const getMyOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const orders = await orderService.getMyOrders(userId);

  res.status(200).json({
    success: true,
    data: orders,
  });
});

const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const orderId = Number(req.params.orderId);
  const order = await orderService.getOrderById(userId, orderId);

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const orderController = {
  placeOrder,
  getMyOrder,
  getOrderById,
};
