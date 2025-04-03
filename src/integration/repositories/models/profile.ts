import Sequelize from "sequelize";
import { ProfileEntity } from "../../../domain/entities/profile";
import { connection } from "../../../infra/db";

export class Profile extends Sequelize.Model {
  static ToEntity(profile: Profile): ProfileEntity {
    const dataValues = profile.dataValues;
    return new ProfileEntity({
      id: dataValues.id,
      firstName: dataValues.firstName,
      lastName: dataValues.lastName,
      profession: dataValues.profession,
      balance: parseFloat(dataValues.balance as unknown as string),
      type: dataValues.type,
    });
  }
}
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2),
    },
    type: {
      type: Sequelize.ENUM("client", "contractor"),
    },
  },
  {
    sequelize: connection,
    modelName: "Profile",
  }
);
