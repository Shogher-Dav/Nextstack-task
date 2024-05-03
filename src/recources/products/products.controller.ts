import { Request, Response, NextFunction } from "express";
import BadRequestError from "../../middlewares/BadRequestError.ts";
import ProductsService from "./products.service.ts";

export default class ProductsController {
  productsService = new ProductsService();

  async getAll(req: Request, res: Response) {
    const page = req.query.page || 0;
    const productsByPage = 5;
    res.json(await this.productsService.getAll(page as number, productsByPage));
  }

  async get(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return next(
        new BadRequestError({
          code: 400,
          message: "Should contain id",
          logging: true,
        }),
      );
    }

    res.json(await this.productsService.get(req.params.id));
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const isValid = this.isValidProduct(req, res, next);
    if (isValid) {
      await this.productsService.create(req.body);
      res.send("Succesfully created");
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const isValid = this.isValidProduct(req, res, next);
    if (isValid) {
      await this.productsService.update(req.params.id, req.body);
      res.send("Succesfully updated");
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return next(
        new BadRequestError({
          code: 400,
          message: "Should contain id",
          logging: true,
        }),
      );
    }

    await this.productsService.remove(req.params.id);
    res.send("Succesfully deleted");
  }

  isValidProduct(req: Request, res: Response, next: NextFunction) {
    if (!req.body.name) {
      return next(
        new BadRequestError({
          code: 400,
          message: "Name is required!",
          logging: true,
        }),
      );
    }
    if (!req.body.price) {
      return next(
        new BadRequestError({
          code: 400,
          message: "Price is required!",
          logging: true,
        }),
      );
    }
    if (!req.body.stock) {
      return next(
        new BadRequestError({
          code: 400,
          message: "Stock is required!",
          logging: true,
        }),
      );
    }
    return true;
  }
}
