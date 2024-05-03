import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import ProductsController from "./products.controller";

const router = Router();
const productsController = new ProductsController();

router.get("/", authMiddleware, async (req, res) => {
  return await productsController.getAll(req, res);
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  return await productsController.get(req, res, next);
});

router.post("/", authMiddleware, async (req, res, next) => {
  return await productsController.create(req, res, next);
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  return await productsController.update(req, res, next);
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  return await productsController.remove(req, res, next);
});

export default router;
