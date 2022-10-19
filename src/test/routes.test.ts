import { expect, test } from "vitest";
import superTest from "supertest";
import { app } from "..";

test("GET/ Deve retornar hello world", async () => {
  const response = await superTest(app).get("/");
  const data = JSON.parse(response.text);
  expect(data?.message).toEqual("Hello World");
});
