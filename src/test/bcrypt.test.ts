import { expect, test } from "vitest";
import { comparePassword, hashPassword } from "../services/auth/bcrypt";

const password = "123456";

test("Deve retornar um hash do tipo string", async () => {
  const hash = await hashPassword(password);
  expect(typeof hash).toEqual("string");
});

test("Deve retornar um hash e quando comparado deve retornar true", async () => {
  const hash = await hashPassword(password);

  const isAuth = await comparePassword(password, hash);
  expect(isAuth).toEqual(true);
});
