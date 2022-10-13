import { expect, test } from "vitest";
import { createUser, deleteUser } from "./user";

const user = {
  email: "gabriel@test.com.br",
  name: "Gabriel Melo",
  password: "123456",
};

test("should be able to create a new user", async () => {
  const response = await createUser({ user });

  response?.message === "User created successfully"
    ? expect(response?.message).toEqual("User created successfully")
    : expect(response?.message).toEqual("User already exist");
});

test("should be able to deleted a user", async () => {
  const response = await deleteUser(user.email);

  response?.message === "User deleted successfully"
    ? expect(response?.message).toEqual("User deleted successfully")
    : expect(response?.message).toEqual("User not found");
});
