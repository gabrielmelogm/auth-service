import { route } from ".";
import { prisma } from "./database/prisma";
import { User } from "./middlewares/user";
import { Request, Response } from "express";

export function Routes() {
  User();

  route.get("/", (req: Request, res: Response) =>
    res.status(200).json({ message: "Hello World" })
  );

  route.post("/createUser", async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    try {
      await prisma.user.create({ data: { email, name, password } });
      return res.status(201).json({ message: "User create successfully" });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  });

  route.delete("/deleteUser/:email", async (req: Request, res: Response) => {
    const email = req.params.email;

    try {
      await prisma.user.delete({
        where: { email: String(email) },
      });
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  });
}
