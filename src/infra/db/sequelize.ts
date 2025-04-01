import { Sequelize } from "sequelize";

export const connection = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});
