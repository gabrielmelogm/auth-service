import supertest from "supertest";
import { expect, test } from "vitest";
import { app } from "../..";
import { user } from "../../config/userTeste";

test("GET /login - Deve retornar um token do tipo string ao fazer login", async () => {
  const response = await supertest(app).get("/login").send({
    email: user.email,
    password: user.password,
  });

  const data = JSON.parse(response.text);
  expect(data?.message).toEqual("User authenticate successfully");
  expect(typeof data?.token).toEqual("string");
});
