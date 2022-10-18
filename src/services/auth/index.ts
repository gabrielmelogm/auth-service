import { comparePassword } from "./bcrypt";
import { getUser, UserProps } from "../user/user";
import jwt from "jsonwebtoken";
import { config } from "../../config/auth";

export interface logInResponse {
  message: string;
  status: boolean;
  token?: string;
}

export async function logIn(user: UserProps) {
  const dataUser = (await getUser(user.email)) as UserProps;

  if (!dataUser) {
    const response: logInResponse = {
      message: "User not found",
      status: false,
    };
    return response;
  }

  const isAuth = await comparePassword(user.password, dataUser.password);

  if (isAuth) {
    const response: logInResponse = {
      message: "User authenticate successfully",
      status: isAuth,
      token: jwt.sign({ id: dataUser.id }, String(config.secret), {
        expiresIn: config.expireIn,
      }),
    };
    return response;
  } else {
    const response: logInResponse = {
      message: "Incorrect email or password",
      status: isAuth,
    };
    return response;
  }
}
