import axios from "axios";
import { describe, expect, it } from "vitest";

describe("Create user", () => {
  it("should be able to create a new user", async () => {
    const user = {
      email: "gabriel@test.com.br",
      name: "Gabriel Melo",
      password: "123456",
    };

    const createUser = await axios.post(
      "http://localhost:3333/createUser",
      user
    );

    expect(createUser.data.message).toEqual("User create successfully");
  });

  it("should be able to remove the user created", async () => {
    const user = {
      email: "gabriel@test.com.br",
    };

    const deleteUser = await axios.delete(
      `http://localhost:3333/deleteUser/${user.email}`
    );

    expect(deleteUser.data.message).toEqual("User deleted successfully");
  });
});
