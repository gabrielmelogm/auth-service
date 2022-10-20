import { ResponseMessage } from "../../config/ResponseMessage";
import { prisma } from "../../database/prisma";
import { User } from "../../entities/User";
import { hashPassword } from "../auth/bcrypt";

export interface CrudUserProps {
  message?: string;
  user: User;
}

export interface CrudResultProps {
  message: string;
  user: Omit<User, "password">;
}

export async function getUser(email: string) {
  try {
    const dataUser = (await prisma.user.findFirst({
      where: {
        email: email,
      },
    })) as User;

    return dataUser;
  } catch (error) {
    return error;
  }
}

export async function createUser({ user }: CrudUserProps) {
  const { email, name } = user;

  const password = await hashPassword(user.password);

  try {
    const userEmail = await getUser(email);

    if (!userEmail) {
      const user = await prisma.user.create({
        select: {
          id: true,
          email: true,
          name: true,
          password: false,
        },
        data: { email, name, password: String(password) },
      });

      const message = ResponseMessage("create");

      const response: CrudResultProps = {
        message,
        user,
      };
      return response;
    } else {
      const message = ResponseMessage("duplicate");
      const response = { message };
      return response;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(email: string) {
  try {
    const userEmail = await getUser(email);

    if (userEmail) {
      const user = await prisma.user.delete({
        select: {
          id: true,
          email: true,
          name: true,
          password: false,
        },
        where: { email: String(email) },
      });

      const message = ResponseMessage("delete");

      const response: CrudResultProps = {
        message,
        user,
      };
      return response;
    } else {
      const message = ResponseMessage("notfound");
      const response = { message };
      return response;
    }
  } catch (error) {
    console.error(error);
  }
}
