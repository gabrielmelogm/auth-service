import { expect, test } from "vitest";
import { sayHello } from "./hello";

test("should sau hello world", () => {
  const response = sayHello();
  expect(response).toEqual("Hello World");
});
