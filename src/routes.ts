import { Router } from "express";
import { HelloWorldController } from "./controllers";
import { LoginAuthController } from "./controllers/auth";
import { CreateUserController, DeleteUserController } from "./controllers/user";
import { HelloWorldMiddleware } from "./middlewares";
import { AuthMiddleware } from "./middlewares/auth";

const route = Router();

route.get("/", HelloWorldMiddleware, HelloWorldController);

route.get("/login", LoginAuthController);

route.use(AuthMiddleware);

route.route("/user").post(CreateUserController).delete(DeleteUserController);

export { route };
