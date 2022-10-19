import { expect, test } from "vitest";
import superTest from "supertest";
import { app } from "..";
import { describe, it } from "node:test";

test("GET/ Deve retornar hello world", async () => {
  const response = await superTest(app).get("/");
  const data = JSON.parse(response.text);
  expect(data?.message).toEqual("Hello World");
});

const user = {
  email: "gabriel@test.com.br",
  name: "Gabriel Melo",
  password: "123456",
};

test("POST /createUser - Deve retornar como mensagem 'User created successfully'", async () => {
  const response = await superTest(app).post("/createUser").send(user);
  expect(!!response).toEqual(true);

  const data = JSON.parse(response.text);
  expect(data?.message).toEqual("User created successfully");
});

test("DELETE /deleteUser - Deve retornar como mensagem 'User deleted successfully'", async () => {
  const response = await superTest(app).delete(`/deleteUser/${user.email}`);
  expect(!!response).toEqual(true);

  const data = JSON.parse(response.text);
  expect(data?.message).toEqual("User deleted successfully");
});
