import axios from "axios";
import { expect, test } from "vitest";

test("server should say hello world", async () => {
  const response = await axios.get("http://localhost:3333");
  expect(response.data.message).toEqual("Hello World");
});
