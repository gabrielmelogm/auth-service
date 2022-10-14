import { expect, describe, it } from "vitest";
import { createUser, deleteUser } from "./user";

const user = {
  email: "gabriel@test.com.br",
  name: "Gabriel Melo",
  password: "123456",
};

describe("Deve ser possível criar um usuário", async () => {
  it("Deve ser possível criar um novo usuário", async () => {
    const response = await createUser({ user });
    expect(response?.message).toEqual("User created successfully");
  });

  it("Não deve ser possível criar um novo usuário com o mesmo email", async () => {
    const response = await createUser({ user });
    expect(response?.message).toEqual("User already exist");
  });

  it.todo(
    "Deve retornar true quando comparar a senha criada com o check da lib"
  );
});

describe("Deve ser possível deletar um usuário", async () => {
  it("Deve ser possível deletar um usuário existente", async () => {
    const response = await deleteUser(user.email);
    expect(response?.message).toEqual("User deleted successfully");
  });

  it("Não deve ser possível deletar um usuário que não existe", async () => {
    const response = await deleteUser(user.email);
    expect(response?.message).toEqual("User not found");
  });
});
