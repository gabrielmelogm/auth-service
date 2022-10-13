import { route } from ".";
import { prisma } from "./database/prisma";
import { User } from "./middlewares/user";
import { Request, Response } from "express";
import { createUser } from "./services/user/user";
import { User as UserProps } from "@prisma/client";

export function Routes() {
  User();

  route.get("/", (req: Request, res: Response) =>
    res.status(200).json({ message: "Hello World" })
  );

  route.post("/createUser", async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    const response = (await createUser({ email, name, password })) as Omit<
      UserProps,
      "password"
    >;

    if (response.id) {
      res
        .status(201)
        .json({ message: "User create successfully", user: response });
    } else {
      res.status(500).json({ message: "Unexpected error" });
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
