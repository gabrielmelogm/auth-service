import express, { Request, Response } from "express";
import { Routes } from "./routes";
import { createUser } from "./services/user/user";

process.on("SIGTERM", () => process.exit());

export const route = express();

route.use(express.json());

Routes();

route.listen(process.env.PORT || "3333", () =>
  console.log("Server is running")
);
