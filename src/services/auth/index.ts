import { comparePassword } from "./bcrypt";
import { getUser, UserProps } from "../user/user";

export interface SignInResponse {
  message: string;
  status: boolean;
}

export async function signIn(user: UserProps) {
  const dataUser = (await getUser(user.email)) as UserProps;

  const isAuth = await comparePassword(user.password, dataUser.password);

  if (isAuth) {
    const response: SignInResponse = {
      message: "User authenticate successfully",
      status: isAuth,
    };
    return response;
  } else {
    const response: SignInResponse = {
      message: "Incorrect email or password",
      status: isAuth,
    };
    return response;
  }
}
