import { logIn, logInResponse } from "../services/auth";
import { ControllerFunction } from "./user";

export const LoginAuthController: ControllerFunction = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(422).json({ message: "Request data is missing" });

  const response: logInResponse = await logIn(req.body);

  if (response.status) {
    return res.status(200).send(response);
  } else {
    return res.status(400).send(response);
  }
};
