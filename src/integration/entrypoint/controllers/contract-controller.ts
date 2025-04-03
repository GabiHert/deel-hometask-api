import { ContractControllerAdapter } from "../../adapters/contract-controller";
import { ContractRepositoryAdapter } from "../../adapters/contract-repository";
import { ContractDto } from "../dtos/contract";

export class ContractController implements ContractControllerAdapter {
  constructor(private readonly contractRepository: ContractRepositoryAdapter) {}
  async getContractById(
    profileId: number,
    contractId: number
  ): Promise<ContractDto> {
    const contract = await this.contractRepository.getContractById(
      profileId,
      contractId
    );
    return new ContractDto(contract);
  }
  async listContracts(profileId: number): Promise<ContractDto[]> {
    const contracts =
      await this.contractRepository.listActiveContractsByProfileId(profileId);
    return ContractDto.FromEntities(contracts);
  }
}
