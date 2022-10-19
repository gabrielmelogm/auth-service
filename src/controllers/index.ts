import { Request, Response } from "express";

export function HelloWorldController(req: Request, res: Response) {
  res.json({ message: "Hello World" });
}
