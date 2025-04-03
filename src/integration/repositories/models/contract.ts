import Sequelize from "sequelize";
import { ContractEntity } from "../../../domain/entities/contract";
import { connection } from "../../../infra/db";

export class ContractModel extends Sequelize.Model {
  static ToEntity(contract: ContractModel): ContractEntity {
    const dataValues = contract.dataValues;
    return new ContractEntity({
      id: dataValues.id,
      terms: dataValues.terms,
      status: dataValues.status,
      clientId: dataValues.ClientId,
      contractorId: dataValues.ContractorId,
    });
  }
  static ToEntities(contracts: ContractModel[]): ContractEntity[] {
    return contracts.map((contract) => ContractModel.ToEntity(contract));
  }
}

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
