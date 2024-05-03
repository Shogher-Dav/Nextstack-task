import { Request, Response, NextFunction } from "express";
import TokenService from "../auth/token.servise";

import BadRequestError from "./BadRequestError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const tokenService = new TokenService();
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(
        new BadRequestError({
          code: 401,
          message: "UnauthorizedError",
          logging: false,
        }),
      );
    }

    const accessToken = authorizationHeader?.split(" ")[1];
    if (!accessToken) {
      return next(
        new BadRequestError({
          code: 401,
          message: "UnauthorizedError",
          logging: false,
        }),
      );
    }

    const userData = tokenService.validateAccessToken(accessToken as string);
    if (!userData) {
      return next(
        new BadRequestError({
          code: 401,
          message: "UnauthorizedError",
          logging: false,
        }),
      );
    }
    next();
  } catch (e) {
    return next(
      new BadRequestError({
        code: 401,
        message: "UnauthorizedError",
        logging: false,
      }),
    );
  }
};
