import { ResponseMessage } from "../../config/ResponseMessage";
import { prisma } from "../../database/prisma";
import { User } from "../../entities/User";
import { hashPassword } from "../auth/bcrypt";

type GetUserProps = (email: string, by?: "id" | "email") => any;

export const getUser: GetUserProps = async (identifier: string, by) => {
  if (by === "email") {
    try {
      const dataUser = (await prisma.user.findFirst({
        where: {
          email: identifier,
        },
      })) as User;

      if (dataUser) {
        return dataUser;
      } else {
        let message = ResponseMessage("notfound");
        return message;
      }
    } catch (error) {
      return error;
    }
  } else {
    try {
      const dataUser = (await prisma.user.findFirst({
        where: {
          id: identifier,
        },
      })) as User;

      if (dataUser) {
        return dataUser;
      } else {
        let message = ResponseMessage("notfound");
        return message;
      }
    } catch (error) {
      return error;
    }
  }
};

export async function createUser(user: User) {
  const { email, name } = user;

  const password = await hashPassword(user.password);

  try {
    const userEmail = (await getUser(email, "email")) as User;

    if (!userEmail.id) {
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

      const response = {
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

export async function updateUser(user: User) {
  const dataUser: User = await getUser(user.id, "id");
  console.log(dataUser);
  if (dataUser.id) {
    try {
      const password = await hashPassword(user.password);

      const updateUser = await prisma.user.update({
        select: {
          id: true,
          email: true,
          name: true,
          password: false,
        },
        data: {
          email: user.email,
          name: user.name,
          password,
        },
        where: {
          id: user.id,
        },
      });
      const message = ResponseMessage("update");
      const response = {
        message,
        user: updateUser,
      };
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  } else {
    const message = ResponseMessage("notfound");
    const response = { message };
    return response;
  }
}

export async function deleteUser(email: string) {
  try {
    const userEmail = await getUser(email, "email");

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

      const response = {
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
