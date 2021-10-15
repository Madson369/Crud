import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../entity/User";



const checkUser = (login) => {
  createConnection()
    .then(async (connection) => {
      const user = await connection
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.login = :id", { id: login })
        .getCount();

      console.log(user);
      user !== 0 ? true : false;
    })
    .catch((error) => console.log(error));
};

console.log(checkUser('madson369'))