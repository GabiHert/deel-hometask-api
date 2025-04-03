import { ClientDepositDto } from "../entrypoint/dtos/client-deposit";
import { ContractDto } from "../entrypoint/dtos/contract";
import { JobDto } from "../entrypoint/dtos/job";
import { TopEarningProfessionMetricsDto } from "../entrypoint/dtos/top-earning-profession-metrics";

/**
 * Interface representing a controller adapter for handling various operations.
 */
export interface ControllerAdapter {
  /**
   * Retrieves a contract by its ID for a specific profile.
   * @param profileId - The ID of the profile requesting the contract.
   * @param contractId - The ID of the contract to retrieve.
   * @returns A promise that resolves to the contract details.
   */
  GetContractById(profileId: number, contractId: number): Promise<ContractDto>;

  /**
   * Lists all contracts associated with a specific profile.
   * @param profileId - The ID of the profile whose contracts are to be listed.
   * @returns A promise that resolves to an array of contract details.
   */
  ListContracts(profileId: number): Promise<ContractDto[]>;

  /**
   * Lists all unpaid jobs for a specific profile.
   * @param profileId - The ID of the profile whose unpaid jobs are to be listed.
   * @returns A promise that resolves to the details of all unpaid jobs.
   */
  ListUnpaidJobs(profileId: number): Promise<JobDto[]>;

  /**
   * Processes payment for a specific job.
   * @param profileId - The ID of the profile making the payment.
   * @param jobId - The ID of the job to be paid for.
   * @returns A promise that resolves to the details of the paid job.
   */
  PayJob(profileId: number, jobId: number): Promise<JobDto>;

  /**
   * Deposits funds to a client's account.
   * @param profileId - The ID of the profile making the deposit.
   * @param clientDeposit - The details of the deposit transaction.
   * @returns A promise that resolves to the details of the deposit transaction.
   */
  DepositToClient(
    profileId: number,
    clientDeposit: ClientDepositDto
  ): Promise<JobDto>;

  /**
   * Retrieves the most successful profession within a specified date range.
   * @param start - The start date of the range (optional).
   * @param end - The end date of the range (optional).
   * @returns A promise that resolves to the details of the most successful profession.
   */
  GetMostSuccessfulProfession(
    start?: string,
    end?: string
  ): Promise<TopEarningProfessionMetricsDto>;

  /**
   * Retrieves the best clients within a specified date range, optionally limited by a maximum number.
   * @param start - The start date of the range (optional).
   * @param end - The end date of the range (optional).
   * @param limit - The maximum number of clients to retrieve (optional).
   * @returns A promise that resolves to the details of the best clients.
   */
  GetBestClients(start?: string, end?: string, limit?: number): Promise<any>;
}
