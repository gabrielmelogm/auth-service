import { ResponseMessage } from "../config/ResponseMessage";
import { logIn, logInResponse } from "../services/auth";
import { ControllerFunction } from "./user";

export const LoginAuthController: ControllerFunction = async (req, res) => {
  const message = ResponseMessage("nodata");

  if (!req.body.email || !req.body.password)
    return res.status(422).json({ message });

  const response: logInResponse = await logIn(req.body);

  if (response.status) {
    return res.status(200).send(response);
  } else {
    return res.status(400).send(response);
  }
};
