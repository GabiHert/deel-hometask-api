import { ContractDto } from "../entrypoint/dtos/contract";
import { JobDto } from "../entrypoint/dtos/job";
import { MostSuccessfulProfessionDto } from "../entrypoint/dtos/most-successful-profession";

export interface ControllerAdapter {
  GetContractById(profileId: number, contractId: number): Promise<ContractDto>;
  ListContracts(profileId: number): Promise<ContractDto[]>;
  ListUnpaidJobs(profileId: number): Promise<JobDto>;
  PayJob(profileId: number, jobId: number): Promise<JobDto>;
  DepositToClient(profileId: number): Promise<JobDto>;
  GetMostSuccessfulProfession(
    start?: string,
    end?: string
  ): Promise<MostSuccessfulProfessionDto>;
  GetBestClients(start?: string, end?: string, limit?: number): Promise<any>;
}
