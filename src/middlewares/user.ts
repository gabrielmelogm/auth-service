import { Request, Response, NextFunction } from "express";
import { route } from "../routes";

export function UserMiddleware() {
  route.use(
    "/createUser",
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.body.email)
        return res.status(422).json({ error: "Email is not informed" });
      if (!req.body.name)
        return res.status(422).json({ error: "Name is not informed" });
      if (!req.body.password)
        return res.status(422).json({ error: "Password is not informed" });

      next();
    }
  );

  route.use(
    "/deleteUser/:email",
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.params.email)
        return res.status(422).json({ error: "Email is not informed" });

      next();
    }
  );
}
