import { validateOrReject } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { CreateOrderValidationSchema } from "../../recources/orders/dto/create-order.input";

export const createOrderValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }
    const order = plainToClass(CreateOrderValidationSchema, req.body);
    await validateOrReject(order);

    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};

export const updateOrderValidator = async (
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
    const order = plainToClass(CreateOrderValidationSchema, req.body);
    await validateOrReject(order);
    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};
