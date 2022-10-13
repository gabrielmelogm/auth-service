import { Request, Response } from "express";
import { route } from "../index";
import { sayHello } from "../services/hello/hello";
import { UsersRoute } from "./user";

export function Routes() {
  UsersRoute();

  route.get("/", (req: Request, res: Response) => {
    const response = sayHello();
    res.status(200).json({ message: response });
  });
}
