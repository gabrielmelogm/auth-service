import { describe, expect, it } from "vitest";
import { logIn, logInResponse } from ".";
import { createUser, deleteUser } from "../user/user";

const user = {
  email: "gabriel@test.com.br",
  name: "Gabriel Melo",
  password: "123456",
};

describe("Deve criar um usuário, fazer login, e retornar um token do tipo string", () => {
  it("Deve ser possível criar um novo usuário", async () => {
    const response = await createUser({ user });
    expect(response?.message).toEqual("User created successfully");
  });

  it("Deve fazer login com usuário logado", async () => {
    const response: logInResponse = await logIn(user);
    expect(typeof response.token).toEqual("string");
  });

  it("Deve deletar o usuário criado", async () => {
    const response = await deleteUser(user.email);
    expect(response?.message).toEqual("User deleted successfully");
  });
});
