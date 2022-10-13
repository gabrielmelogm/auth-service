import { Request, Response } from "express";
import { route } from "..";
import { UserMiddleware } from "../middlewares/user";
import {
  createUser,
  CrudResultProps,
  deleteUser,
  UserProps,
} from "../services/user/user";

export function UsersRoute() {
  UserMiddleware();

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
