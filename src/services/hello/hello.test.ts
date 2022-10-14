import { expect, test } from "vitest";
import { sayHello } from "./hello";

test("Deve retornar hello world", () => {
  const response = sayHello();
  expect(response).toEqual("Hello World");
});
