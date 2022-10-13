import { expect, describe, it } from "vitest";
import { createUser, deleteUser } from "./user";

const user = {
  email: "gabriel@test.com.br",
  name: "Gabriel Melo",
  password: "123456",
};

describe("should be able to create user", async () => {
  it("should be able to create a new user", async () => {
    const response = await createUser({ user });
    expect(response?.message).toEqual("User created successfully");
  });

  it("should not possible to create a same user", async () => {
    const response = await createUser({ user });
    expect(response?.message).toEqual("User already exist");
  });
});

describe("should be able to deleted a user", async () => {
  it("should be able to deleted a existing user", async () => {
    const response = await deleteUser(user.email);
    expect(response?.message).toEqual("User deleted successfully");
  });

  it("should not possible delete a user that does not exist", async () => {
    const response = await deleteUser(user.email);
    expect(response?.message).toEqual("User not found");
  });
});
