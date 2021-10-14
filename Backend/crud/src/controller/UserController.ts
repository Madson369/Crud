import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response } from "express";
// import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

export const getUsers = async (request: Request, response: Response) => {
  const users = await getRepository(User).find();
  return response.json(users);
};

export const getUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await getRepository(User).findOne(id);
  return response.json(user);
};

export const saveUser = async (request: Request, response: Response) => {
  const user = await getRepository(User).save(request.body);
  return response.json(user);
};

export const updateUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await getRepository(User).update(id, request.body);

  if (user.affected === 1) {
    const userUpdated = await getRepository(User).findOne(id);
    return response.json(userUpdated);
  }
  return response.status(404).json({ message: "User not found" });
};

export const deleteUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await getRepository(User).delete(id);

  if (user.affected === 1) {
    const userUpdated = await getRepository(User).findOne(id);
    return response.json({ message: `User ${id} deleted` });
  }
  return response.status(404).json({ message: "User not found" });
};
