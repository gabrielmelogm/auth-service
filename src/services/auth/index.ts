import { comparePassword, verifyInformations } from "./bcrypt";
import { getUser, UserProps } from "../user/user";

export async function getAuth(user: UserProps) {
  const isError = verifyInformations(user);

  if (!isError) {
    const dataUser = (await getUser(user.email)) as UserProps;
    const isAuth = await comparePassword(user.password, dataUser.password);
    if (isAuth) {
      const response = {
        message: "User authenticate successfully",
        status: isAuth,
      };
      return response;
    } else {
      const response = {
        message: "Incorrect email or password",
        status: isAuth,
      };
      return response;
    }
  } else {
    return isError;
  }
}
