import { Request, Response, NextFunction } from "express";

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const HelloWorldMiddleware: MiddlewareFunction = (req, res, next) => {
  console.log("Hello World");
  next();
};
