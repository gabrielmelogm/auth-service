import express from "express";
import { Routes } from "./routes";

process.on("SIGTERM", () => process.exit());

export const route = express();

route.use(express.json());

Routes();

route.listen(process.env.PORT || "3333", () =>
  console.log("Server is running")
);
