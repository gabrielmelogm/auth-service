import { Request, Response } from "express";
import { route } from "..";
import { getAuth } from "../services/auth";

export function Auth() {
  route.get("/auth", async (req: Request, res: Response) => {
    const response: any = await getAuth(req.body);

    if (response.status) {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }
  });
}
