import { ResponseMessage } from "../../config/ResponseMessage";
import { prisma } from "../../database/prisma";
import { User } from "../../entities/User";
import { hashPassword } from "../auth/bcrypt";

type GetUserProps = (
  identifier: string,
  by?: "id" | "email" | "username"
) => any;

export const getUser: GetUserProps = async (identifier, by) => {
  switch (by) {
    case "email":
      try {
        const dataUser = await prisma.user.findFirst({
          where: {
            email: identifier,
          },
        });

        if (dataUser) {
          return dataUser;
        } else {
          let message = ResponseMessage("notfound");
          return message;
        }
      } catch (error) {
        return error;
      }

    case "id":
      try {
        const dataUser = await prisma.user.findFirst({
          where: {
            id: identifier,
          },
        });

        if (dataUser) {
          return dataUser;
        } else {
          let message = ResponseMessage("notfound");
          return message;
        }
      } catch (error) {
        return error;
      }

    case "username":
      try {
        const dataUser = await prisma.user.findFirst({
          where: {
            username: identifier,
          },
        });

        if (dataUser) {
          return dataUser;
        } else {
          let message = ResponseMessage("notfound");
          return message;
        }
      } catch (error) {
        return error;
      }
    default:
      break;
  }
};

export async function createUser(user: User) {
  const { email, name, username } = user;

  const password = await hashPassword(user.password);

  try {
    const userEmail = (await getUser(email, "email")) as User;

    if (!userEmail.id) {
      const user = await prisma.user.create({
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          password: false,
        },
        data: { username, email, name, password: String(password) },
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
  if (dataUser.id) {
    try {
      const password = await hashPassword(user.password);

      const updateUser = await prisma.user.update({
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          password: false,
        },
        data: {
          username: user.username,
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
          username: true,
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
