import { createUser } from "../src/services/user/user";
import { prisma } from "../src/database/prisma";
import { user } from "../src/config/userTeste";

async function main() {
  await createUser(user);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
