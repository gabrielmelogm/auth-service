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

test("POST CreateUser - Deve retornar uma resposta de sucesso de criação", async () => {
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

test("GET GetUser - Deve retornar um json com os dados do usuário", async () => {
  const responseToken = await superTest(app).get("/login").send({
    email: user.email,
    password: user.password,
  });

  const dataToken = JSON.parse(responseToken.text);

  const response = await superTest(app)
    .get("/user")
    .send(newUser)
    .set("x-access-token", dataToken?.token);

  expect(!!response).toEqual(true);
  const data = JSON.parse(response.text);
  expect(data?.email).toEqual(newUser.email);
});

test("PUT UpdateUser - Deve retornar um json com os dados do usuário atualizado", async () => {
  const updateUser = {
    email: "johndoe@test.com.br",
    name: "Doe John",
    password: "654321",
  };

  const responseToken = await superTest(app).get("/login").send({
    email: user.email,
    password: user.password,
  });

  const dataToken = JSON.parse(responseToken.text);

  const testeUser = await superTest(app)
    .get("/user")
    .send(updateUser)
    .set("x-access-token", dataToken?.token);

  const dataUserTeste = JSON.parse(testeUser.text);

  const response = await superTest(app)
    .put("/user")
    .send({
      id: dataUserTeste.id,
      email: updateUser.email,
      name: updateUser.name,
      password: updateUser.password,
    })
    .set("x-access-token", dataToken?.token);

  expect(!!response).toEqual(true);
  const message = ResponseMessage("update");
  const data = JSON.parse(response.text);
  expect(data?.message).toEqual(message);
});

test("DELETE DeleteUser - Deve retornar uma resposta de sucesso de deleção", async () => {
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
