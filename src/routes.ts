import { route } from ".";
import { User } from "./middlewares/user";
import { Request, Response } from "express";
import { createUser, deleteUser } from "./services/user/user";
import { UserProps, CrudResultProps } from "./services/user/user";
import { sayHello } from "./services/hello/hello";

export function Routes() {
  User();

  route.get("/", (req: Request, res: Response) => {
    const response = sayHello();
    res.status(200).json({ message: response });
  });

  route.post("/createUser", async (req: Request, res: Response) => {
    const user: UserProps = req.body;

    const response = (await createUser({ user })) as CrudResultProps;

    if (response.message === "User created successfully") {
      res.status(201).json(response);
    } else {
      res.status(400).json(response);
    }
  });

  route.delete("/deleteUser/:email", async (req: Request, res: Response) => {
    const email = req.params.email;

    try {
      const response = (await deleteUser(email)) as CrudResultProps;

      if (response.message === "User deleted successfully") {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  });
}
