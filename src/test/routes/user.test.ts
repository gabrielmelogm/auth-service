import { expect, test } from "vitest";
import superTest from "supertest";
import { app } from "../..";
import { ResponseMessage } from "../../config/ResponseMessage";

const user = {
  email: "gabriel@test.com.br",
  name: "Gabriel Melo",
  password: "123456",
};

test("POST /createUser - Deve retornar uma resposta de sucesso de criação", async () => {
  const response = await superTest(app).post("/user").send(user);
  expect(!!response).toEqual(true);

  const message = ResponseMessage("create");

  const data = JSON.parse(response.text);
  expect(data?.message).toEqual(message);
});

test("GET /login - Deve retornar um token do tipo string ao fazer login", async () => {
  const response = await superTest(app).get("/login").send({
    email: user.email,
    password: user.password,
  });

  const data = JSON.parse(response.text);
  expect(data?.message).toEqual("User authenticate successfully");
  expect(typeof data?.token).toEqual("string");
});

test("DELETE /deleteUser - Deve retornar uma resposta de sucesso de deleção", async () => {
  const response = await superTest(app)
    .delete("/user")
    .send({ email: user.email });
  expect(!!response).toEqual(true);

  const message = ResponseMessage("delete");

  const data = JSON.parse(response.text);
  expect(data?.message).toEqual(message);
});
