import Sequelize from "sequelize";
import { connection } from "../../../infra/db";

export class Contract extends Sequelize.Model {}
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("new", "in_progress", "terminated"),
    },
  },
  {
    sequelize: connection,
    modelName: "Contract",
  }
);
