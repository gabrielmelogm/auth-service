import { prisma } from "../database/prisma";

export async function userExist(email: string) {
  try {
    const user = await prisma.user.findFirst({
      select: {
        email: true,
      },
      where: {
        email,
      },
    });
    return !!user;
  } catch (error) {
    console.error(error);
  }
}
