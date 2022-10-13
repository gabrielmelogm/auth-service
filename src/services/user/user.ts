import { userExist } from "../../controllers/user";
import { prisma } from "../../database/prisma";

export interface UserProps {
  id?: string;
  email: string;
  name: string;
  password: string;
}

export interface CrudUserProps {
  message?: string;
  user: UserProps;
}

export interface CrudResultProps {
  message: string;
  user: Omit<UserProps, "password">;
}

export async function createUser({ user }: CrudUserProps) {
  const { email, name, password } = user;

  try {
    const userEmail = await userExist(email);

    if (!userEmail) {
      const user = await prisma.user.create({
        select: {
          id: true,
          email: true,
          name: true,
          password: false,
        },
        data: { email, name, password },
      });

      const response: CrudResultProps = {
        message: "User created successfully",
        user,
      };
      return response;
    } else {
      const response = { message: "User already exist" };
      return response;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(email: string) {
  try {
    const userEmail = await userExist(email);

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

      const response: CrudResultProps = {
        message: "User deleted successfully",
        user,
      };
      return response;
    } else {
      const response = { message: "User not found" };
      return response;
    }
  } catch (error) {
    console.error(error);
  }
}
