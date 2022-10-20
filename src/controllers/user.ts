import { Request, Response } from "express";
import { ResponseMessage } from "../config/ResponseMessage";
import { User } from "../entities/User";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../services/user/user";

export type ControllerFunction = (req: Request, res: Response) => void;

export const GetUserController: ControllerFunction = async (req, res) => {
  let message = ResponseMessage("nodata");

  if (!req.body.email) return res.status(422).json({ message });

  const response = (await getUser(req.body.email, "email")) as User | undefined;

  if (response?.id) {
    const data = {
      id: response.id,
      email: response.email,
      name: response.name,
    };
    return res.status(200).send(data);
  } else {
    return res.status(400).json({ message: response });
  }
};

export const CreateUserController: ControllerFunction = async (req, res) => {
  let message = ResponseMessage("nodata");

  if (!req.body.email || !req.body.name || !req.body.password)
    return res.status(422).json({ message });

  const user: User = req.body;

  const response = await createUser(user);

  message = ResponseMessage("create");

  if (response?.message === message) {
    res.status(201).json(response);
  } else {
    res.status(400).json(response);
  }
};

export const UpdateUserController: ControllerFunction = async (req, res) => {
  let message = ResponseMessage("nodata");

  if (!req.body.id || !req.body.email || !req.body.name || !req.body.password)
    return res.status(422).json({ message });

  const user: User = req.body;

  const response: any = await updateUser(user);

  message = ResponseMessage("update");

  if (response?.message === message) {
    res.status(200).json(response);
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
    const response = await deleteUser(email);

    if (response?.message === message) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};
