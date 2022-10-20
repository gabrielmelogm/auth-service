import { Request, Response } from "express";
import { User } from "../entities/User";
import { createUser, CrudResultProps, deleteUser } from "../services/user/user";

export type ControllerFunction = (req: Request, res: Response) => void;

export const CreateUserController: ControllerFunction = async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password)
    return res.status(422).json({ message: "Request data is missing" });

  const user: User = req.body;

  const response = (await createUser({ user })) as CrudResultProps;

  if (response.message === "User created successfully") {
    res.status(201).json(response);
  } else {
    res.status(400).json(response);
  }
};

export const DeleteUserController: ControllerFunction = async (req, res) => {
  if (!req.params.email)
    return res.status(422).json({ message: "Request data is missing" });

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
};
