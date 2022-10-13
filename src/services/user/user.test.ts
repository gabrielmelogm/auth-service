import { User } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { createUser } from "./user";

describe("Create user", () => {
  it("should be able to create a new user", async () => {
    const user = {
      email: "gabriel@test.com.br",
      name: "Gabriel Melo",
      password: "123456",
    };

    const response = (await createUser({
      email: user.email,
      name: user.name,
      password: user.password,
    })) as User;

    expect(!!response.id).toEqual(true);
  });
});
