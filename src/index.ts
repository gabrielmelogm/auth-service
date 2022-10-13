import axios from "axios";
import express, { Request, Response } from "express";
import { Routes } from "./routes";

process.on("SIGTERM", () => process.exit());

export const route = express();

route.use(express.json());

Routes();

const verify = async () => {
  const user = {
    email: "gabriel.melo@maximize.art.br",
    name: "Gabriel Melo",
    password: "123456",
  };

  const createUser = await axios.post("http://localhost:3333/createUser", user);
  console.log(createUser);
};

// verify();

route.listen(process.env.PORT || "3333", () =>
  console.log("Server is running")
);
