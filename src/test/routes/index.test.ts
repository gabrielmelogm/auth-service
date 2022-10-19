import { expect, test } from "vitest";
import superTest from "supertest";
import { route } from "../../routes";

test("GET/ Deve retornar hello world", async () => {
  const response = await superTest(route).get("/");
  // const data = JSON.parse(response.text);
  expect(response.text).toEqual("Hello World");
});
