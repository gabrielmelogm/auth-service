import { route } from "../index";
import { Request, Response, NextFunction } from "express";

export function AuthMiddleware() {
  route.use(
    "/auth",
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.body.email)
        return res.status(422).json({ error: "Email is not informed" });
      if (!req.body.password)
        return res.status(422).json({ error: "Password is not informed" });

      next();
    }
  );
}
