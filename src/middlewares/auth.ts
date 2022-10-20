import jwt from "jsonwebtoken";
import { MiddlewareFunction } from ".";
import { config } from "../config/auth";

export const AuthMiddleware: MiddlewareFunction = (req, res, next) => {
  const token = req.headers["x-access-token"] as string;
  if (!token)
    return res.status(500).json({ auth: false, message: "No token provided" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token" });

    console.log(decoded);
    next();
  });
};
