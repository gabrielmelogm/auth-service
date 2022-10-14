import { Request, Response } from "express";
import { route } from "..";
import { AuthMiddleware } from "../middlewares/auth";
import { signIn, SignInResponse } from "../services/auth";

export function Auth() {
  AuthMiddleware();

  route.get("/auth", async (req: Request, res: Response) => {
    const response: SignInResponse = await signIn(req.body);

    if (response.status) {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }
  });
}
