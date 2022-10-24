import { v4 } from "uuid";
import { User } from "../entities/User";

export const user: User = {
  id: v4(),
  username: "gabrielmelo",
  email: "gabriel@admin.com.br",
  name: "Gabriel Melo",
  password: "123456",
};
