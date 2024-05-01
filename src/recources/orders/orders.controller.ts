import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import BadRequestError from "../../middlewares/BadRequestError";
import ProductsService from "../products/products.service";
import IProduct from "../products/products.types";
import OrdersService from "./orders.service";
import IOrder from "./orders.types";

export default class OrdersController {
  ordersService = new OrdersService();
  productsService = new ProductsService();

  public async getAll(req: Request, res: Response) {
    const page = req.query.page || 0;
    const ordersByPage = 5;
    res.json(await this.ordersService.getAll(page as number, ordersByPage));
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return next(
        new BadRequestError({
          code: 400,
          message: "Should contain id",
          logging: true,
        }),
      );
    }
    res.json(await this.ordersService.get(req.params.id));
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const isValid = await this.isValidOrder(req, res, next);
    if (isValid) {
      await this.ordersService.create(req.body);
      this.updateProductAfterOrderCreated(req.body);
      res.send("Succesfully created");
    }
  }
  async updateProductAfterOrderCreated(data: IOrder) {
    const { product_id, quantities }: IOrder = data;
    const product = await this.productsService.get(product_id);
    if (product?.stock !== undefined) {
      const stock = product?.stock - quantities;
      const updatedProduct: IProduct = {
        stock,
        name: product?.name,
        description: product?.description,
        price: product.price,
      };
      await this.productsService.update(product_id, updatedProduct);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const isValid = await this.isValidOrder(req, res, next);
    if (isValid) {
      await this.ordersService.update(req.params.id, req.body);
      res.send("Succesfully updated");
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return next(
        new BadRequestError({
          code: 400,
          message: "Should contain id",
          logging: true,
        }),
      );
    }
    await this.ordersService.remove(req.params.id);
    res.send("Succesfully deleted");
  }

  async isValidOrder(req: Request, res: Response, next: NextFunction) {
    if (req.body.quantities < 1) {
      return next(
        new BadRequestError({
          code: 400,
          message: "Quantity should be at least 1",
          logging: true,
        }),
      );
    }

    const product_id = req.body.product_id;
    const product = await this.productsService.get(product_id);
    const productStock = product?.stock || 0;
    if (req.body.quantities > productStock) {
      return next(
        new BadRequestError({
          code: 400,
          message: `This quantity of product doesn't available`,
          logging: true,
        }),
      );
    }

    if (product?.price !== undefined) {
      const allProductPrice = req.body.quantities * product?.price;
      if (req.body.total_price !== allProductPrice) {
        return next(
          new BadRequestError({
            code: 400,
            message: `Wrong total price`,
            logging: true,
          }),
        );
      }
    }
    return true;
  }
}
