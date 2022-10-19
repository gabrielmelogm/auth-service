import express from "express";
import { Request, Response } from "express";
import { sayHello } from "../services/hello/hello";
import { Auth } from "./auth";
import { UsersRoute } from "./user";

const route = express();

route.use(express.json());

export function Routes() {
  Auth();
  UsersRoute();

  route.get("/", (req: Request, res: Response) => {
    const response = sayHello();
    res.status(200).json({ message: response });
  });
}

export { route };
