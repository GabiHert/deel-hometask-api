import Sequelize from "sequelize";
import { JobEntity } from "../../../domain/entities/job";
import { connection } from "../../../infra/db";
export class JobModel extends Sequelize.Model {
  static ToEntity(job: JobModel): JobEntity {
    const dataValues = job.dataValues;
    return new JobEntity({
      id: dataValues.id,
      description: dataValues.description,
      price: dataValues.price,
      paid: dataValues.paid,
      paymentDate: dataValues.paymentDate,
      contractId: dataValues.contractId,
    });
  }

  static ToEntities(jobs: JobModel[]): JobEntity[] {
    return jobs.map((job) => JobModel.ToEntity(job));
  }
}
JobModel.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: "Job",
  }
);
