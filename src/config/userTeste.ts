import { v4 } from "uuid";
import { User } from "../entities/User";

export const user: User = {
  id: v4(),
  username: "maximize",
  email: "maximize@maximize.com.br",
  name: "Maximize",
  password: "maximize",
};
