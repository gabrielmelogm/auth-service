import { route } from "../index";
import { prisma } from "../database/prisma";
import { Request, Response, NextFunction } from "express";

export function User() {
  route.use(
    "/createUser",
    async (req: Request, res: Response, next: NextFunction) => {
      const response = await prisma.user.findFirst({
        select: {
          email: true,
          password: false,
        },
        where: {
          email: req.body.email,
        },
      });

      if (!req.body.email)
        return res.status(400).json({ error: "Email is not informed" });
      if (response?.email)
        return res.status(400).json({ error: "Email already exist" });
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

      const user = await prisma.user.findFirst({
        select: {
          email: true,
        },
        where: {
          email: String(req.params.email),
        },
      });

      if (!user?.email)
        return res.status(400).json({ error: "User not found" });

      next();
    }
  );
}
