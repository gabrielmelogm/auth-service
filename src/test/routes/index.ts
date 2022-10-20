import supertest from "supertest";
import { test, expect } from "vitest";
import { app } from "../..";

test("GET/ Deve retornar hello world", async () => {
  const response = await supertest(app).get("/");
  const data = JSON.parse(response.text);
  expect(data?.message).toEqual("Hello World");
});
