import { Router, Request, Response } from "express";
import {
  getUsers,
  saveUser,
  getUser,
  updateUser,
  deleteUser,
} from "./controller/UserController";

const routes = Router();
const validation = require("./Middlewares/validationMiddleware.js");
const userSchema = require("./Validations/userValidation.js");

routes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Hello world" });
});

routes.get("/user", getUsers);
routes.get("/user/:id", getUser);
routes.post("/user", validation(userSchema), saveUser);
routes.put("/user/:id", validation(userSchema), updateUser);
routes.delete("/user/:id", deleteUser);
export default routes;
