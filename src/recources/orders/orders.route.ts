import { Router } from "express";
import OrdersController from "./orders.controller";

const router = Router();
const ordersController = new OrdersController();

router.get("/", async (req, res) => {
  return await ordersController.getAll(req, res);
});
router.get("/:id", async (req, res, next) => {
  return await ordersController.get(req, res, next);
});
router.post("/", async (req, res, next) => {
  return await ordersController.create(req, res, next);
});
router.put("/:id", async (req, res, next) => {
  return await ordersController.update(req, res, next);
});
router.delete("/:id", async (req, res, next) => {
  await ordersController.remove(req, res, next);
});

export default router;
