import { Router } from "express";
import { HelloWorldController } from "./controllers";
import { LoginAuthController } from "./controllers/auth";
import {
  CreateUserController,
  DeleteUserController,
  GetUserController,
  UpdateUserController,
} from "./controllers/user";
import { HelloWorldMiddleware } from "./middlewares";
import { AuthMiddleware } from "./middlewares/auth";

const route = Router();

route.get("/", HelloWorldMiddleware, HelloWorldController);

route.get("/login", LoginAuthController);

route.use(AuthMiddleware);

route
  .route("/user")
  .get(GetUserController)
  .post(CreateUserController)
  .put(UpdateUserController)
  .delete(DeleteUserController);

export { route };
