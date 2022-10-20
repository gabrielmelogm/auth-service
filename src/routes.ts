import { Router } from "express";
import { HelloWorldController } from "./controllers";
import { LoginAuthController } from "./controllers/auth";
import { CreateUserController, DeleteUserController } from "./controllers/user";
import { HelloWorldMiddleware } from "./middlewares";

const route = Router();

route.get("/", HelloWorldMiddleware, HelloWorldController);

route.route("/user").post(CreateUserController).delete(DeleteUserController);

route.get("/login", LoginAuthController);

export { route };
