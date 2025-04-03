import { ContractEntity } from "../../domain/entities/contract";
import { ContractStatusEnum } from "../../domain/enums/contract-status";
import { ContractRepositoryAdapter } from "../adapters/contract-repository";
import { ContractModel } from "./models";

export class ContractRepository implements ContractRepositoryAdapter {
  async getContractById(
    profileId: number,
    id: number
  ): Promise<ContractEntity> {
    const contract = await ContractModel.findOne({
      where: {
        id,
        profileId,
      },
    });

    if (!contract) {
      throw new Error(
        `Contract with id ${id} and profileId ${profileId} not found.`
      );
    }

    return ContractModel.ToEntity(contract);
  }

  async listActiveContractsByProfileId(
    profileId: number
  ): Promise<ContractEntity[]> {
    const contracts = await ContractModel.findAll({
      where: {
        profileId,
        status: ContractStatusEnum.IN_PROGRESS,
      },
    });

    return ContractModel.ToEntities(contracts);
  }
}
