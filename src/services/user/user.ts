import { userExist } from "../../controllers/user";
import { prisma } from "../../database/prisma";

interface CreateUserProps {
  email: string;
  name: string;
  password: string;
}

export async function createUser({ email, name, password }: CreateUserProps) {
  try {
    const user = await userExist(email);

    if (!user) {
      const response = await prisma.user.create({
        select: {
          id: true,
          email: true,
          name: true,
          password: false,
        },
        data: { email, name, password },
      });
      return response;
    } else {
      return console.log("User already exist");
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}
