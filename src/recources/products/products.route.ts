import { Router } from "express";
import ProductsController from "./products.controller";

const router = Router();
const productsController = new ProductsController();

router.get("/", async (req, res) => {
  return await productsController.getAll(req, res);
});

router.get("/:id", async (req, res, next) => {
  return await productsController.get(req, res, next);
});

router.post("/", async (req, res, next) => {
  return await productsController.create(req, res, next);
});

router.put("/:id", async (req, res, next) => {
  return await productsController.update(req, res, next);
});

router.delete("/:id", async (req, res, next) => {
  return await productsController.remove(req, res, next);
});

export default router;
