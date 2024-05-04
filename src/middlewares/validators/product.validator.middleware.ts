import { validateOrReject } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { CreateProductValidationSchema } from "../../recources/products/dto/create-product.input";
import { UpdateProductValidationSchema } from "../../recources/products/dto/update-product.input";

export const createProductValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }
    const product = plainToClass(CreateProductValidationSchema, req.body);
    await validateOrReject(product);

    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};

export const updateProductValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.params?.id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }
    const product = plainToClass(UpdateProductValidationSchema, req.body);
    await validateOrReject(product);
    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};
