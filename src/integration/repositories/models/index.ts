import { ContractModel } from "./contract";
import { JobModel } from "./job";
import { Profile as ProfileModel } from "./profile";

ProfileModel.hasMany(ContractModel, {
  as: "Contractor",
  foreignKey: "ContractorId",
});
ContractModel.belongsTo(ProfileModel, { as: "Contractor" });
ProfileModel.hasMany(ContractModel, { as: "Client", foreignKey: "ClientId" });
ContractModel.belongsTo(ProfileModel, { as: "Client" });
ContractModel.hasMany(JobModel);
JobModel.belongsTo(ContractModel);

export { ContractModel, JobModel, ProfileModel };
