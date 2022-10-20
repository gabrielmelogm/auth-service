import { route } from "./routes";
import express from "express";

process.on("SIGTERM", () => process.exit());

export const app = express();

app.use(express.json());
app.use(route);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || "3333", () =>
    console.log("Server is running")
  );
}
