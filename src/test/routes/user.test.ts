import { expect, test } from "vitest";
import superTest from "supertest";
import { app } from "../..";
import { ResponseMessage } from "../../config/ResponseMessage";
import { user } from "../../config/userTeste";

const newUser = {
  email: "johndoe@test.com.br",
  name: "John Doe",
  password: "123456",
};

test("POST /createUser - Deve retornar uma resposta de sucesso de criação", async () => {
  const responseToken = await superTest(app).get("/login").send({
    email: user.email,
    password: user.password,
  });

  const dataToken = JSON.parse(responseToken.text);

  const response = await superTest(app)
    .post("/user")
    .send(newUser)
    .set("x-access-token", dataToken?.token);

  expect(!!response).toEqual(true);

  const message = ResponseMessage("create");

  const data = JSON.parse(response.text);
  expect(data?.message).toEqual(message);
});

test("DELETE /deleteUser - Deve retornar uma resposta de sucesso de deleção", async () => {
  const responseToken = await superTest(app).get("/login").send({
    email: user.email,
    password: user.password,
  });

  const dataToken = JSON.parse(responseToken.text);

  const response = await superTest(app)
    .delete("/user")
    .send({ email: newUser.email })
    .set("x-access-token", dataToken?.token);
  expect(!!response).toEqual(true);

  const message = ResponseMessage("delete");

  const data = JSON.parse(response.text);
  expect(data?.message).toEqual(message);
});
