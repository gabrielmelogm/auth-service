import { route } from "../index";
import { Request, Response, NextFunction } from "express";

export function UserMiddleware() {
  route.use(
    "/createUser",
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.body.email)
        return res.status(400).json({ error: "Email is not informed" });
      if (!req.body.name)
        return res.status(400).json({ error: "Name is not informed" });
      if (!req.body.password)
        return res.status(400).json({ error: "Password is not informed" });

      next();
    }
  );

  route.use(
    "/deleteUser/:email",
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.params.email)
        return res.status(400).json({ error: "Email is not informed" });

      next();
    }
  );
}
