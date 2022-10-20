import { Request, Response } from "express";
import { ResponseMessage } from "../config/ResponseMessage";
import { User } from "../entities/User";
import { createUser, CrudResultProps, deleteUser } from "../services/user/user";

export type ControllerFunction = (req: Request, res: Response) => void;

export const CreateUserController: ControllerFunction = async (req, res) => {
  let message = ResponseMessage("nodata");

  if (!req.body.email || !req.body.name || !req.body.password)
    return res.status(422).json({ message });

  const user: User = req.body;

  const response = (await createUser({ user })) as CrudResultProps;

  message = ResponseMessage("create");

  if (response.message === message) {
    res.status(201).json(response);
  } else {
    res.status(400).json(response);
  }
};

export const DeleteUserController: ControllerFunction = async (req, res) => {
  let message = ResponseMessage("nodata");
  if (!req.body.email) return res.status(422).json({ message });

  const email = req.body.email;

  message = ResponseMessage("delete");

  try {
    const response = (await deleteUser(email)) as CrudResultProps;

    if (response.message === message) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};
