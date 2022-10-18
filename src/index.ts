import { route, Routes } from "./routes";

process.on("SIGTERM", () => process.exit());

Routes();

route.listen(process.env.PORT || "3333", () =>
  console.log("Server is running")
);
