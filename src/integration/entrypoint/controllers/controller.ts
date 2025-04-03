import { DepositToClientUseCaseAdapter } from "../../../application/adapter/deposit-money-to-client-use-case";
import { PayJobUseCaseAdapter } from "../../../application/adapter/pay-job-use-case";
import { ContractRepositoryAdapter } from "../../adapters/contract-repository";
import { ControllerAdapter } from "../../adapters/controller";
import { JobRepositoryAdapter } from "../../adapters/job-repository";
import { ProfileRepositoryAdapter } from "../../adapters/profile-repository";
import { ContractDto } from "../dtos/contract";
import { JobDto } from "../dtos/job";
import { TopEarningProfessionMetricsDto } from "../dtos/top-earning-profession-metrics";

export class Controller implements ControllerAdapter {
  constructor(
    private readonly contractRepository: ContractRepositoryAdapter,
    private readonly jobsRepository: JobRepositoryAdapter,
    private readonly profileRepository: ProfileRepositoryAdapter,
    private readonly depositToClientUseCase: DepositToClientUseCaseAdapter,
    private readonly payJobUseCase: PayJobUseCaseAdapter
  ) {}
  async GetContractById(
    profileId: number,
    contractId: number
  ): Promise<ContractDto> {
    const contract = await this.contractRepository.getContractById(
      profileId,
      contractId
    );
    return new ContractDto(contract);
  }
  async ListContracts(profileId: number): Promise<ContractDto[]> {
    const contracts =
      await this.contractRepository.listActiveContractsByProfileId(profileId);
    return ContractDto.FromEntities(contracts);
  }
  async ListUnpaidJobs(profileId: number): Promise<JobDto[]> {
    const unpaidJobs = await this.jobsRepository.fetchUnpaidJobsByProfileId(
      profileId
    );
    return JobDto.FromEntities(unpaidJobs);
  }
  async PayJob(profileId: number, jobId: number): Promise<JobDto> {
    const updatedJob = await this.payJobUseCase.payJob(profileId, jobId);
    return new JobDto(updatedJob);
  }
  async DepositToClient(profileId: number): Promise<JobDto> {
    //todo: call usecase
    throw new Error("Method not implemented.");
  }
  async GetMostSuccessfulProfession(
    start?: string,
    end?: string
  ): Promise<TopEarningProfessionMetricsDto> {
    const startDate: Date = start ? new Date(start) : new Date();
    const endDate: Date = end ? new Date(end) : new Date();

    const topEarningProfessionMetrics =
      await this.profileRepository.getTopEarningProfessionMetrics(
        startDate,
        endDate
      );

    return new TopEarningProfessionMetricsDto(topEarningProfessionMetrics);
  }
  async GetBestClients(
    _start?: string,
    _end?: string,
    _limit?: number
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
