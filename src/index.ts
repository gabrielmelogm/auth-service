import { route } from "./routes";
import express from "express";

process.on("SIGTERM", () => process.exit());

export const app = express();

app.use(express.json());
app.use(route);

app.listen(process.env.PORT || "3333", () => console.log("Server is running"));
