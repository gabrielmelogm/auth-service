import { expect, test } from "vitest";
import superTest from "supertest";
import { route } from "../../routes";

const user = {
  email: "gabriel@test.com.br",
  name: "Gabriel Melo",
  password: "123456",
};

test.todo("POST - Deve ser possível criar um novo usuário", async () => {
  const response = await superTest(route).post("/createUser").send(user);

  const data = JSON.parse(response.text);
  expect(response).toEqual("User created successfully");
});
