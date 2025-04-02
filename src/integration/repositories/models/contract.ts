import Sequelize from "sequelize";
import { connection } from "../../../infra/db";

export class ContractModel extends Sequelize.Model {}
ContractModel.init(
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
