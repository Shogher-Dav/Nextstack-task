import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createProductValidator,
  updateProductValidator,
} from "../../middlewares/validators/product.validator.middleware";
import ProductsController from "./products.controller";

const router = Router();
const productsController = new ProductsController();

router.get("/", authMiddleware, async (req, res) => {
  return await productsController.getAll(req, res);
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  return await productsController.get(req, res, next);
});

router.post("/", authMiddleware, createProductValidator, async (req, res) => {
  return await productsController.create(req, res);
});

router.put("/:id", authMiddleware, updateProductValidator, async (req, res) => {
  return await productsController.update(req, res);
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  return await productsController.remove(req, res, next);
});

export default router;
