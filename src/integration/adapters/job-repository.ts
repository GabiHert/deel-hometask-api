import { JobEntity } from "../../domain/entities/job";

/**
 * Adapter interface for interacting with contract data sources.
 * Provides methods to fetch contract information based on various criteria.
 */
export interface JobRepositoryAdapter {
  /**
   * Fetches all unpaid jobs for a user (either a client or contractor),
   * but only for active contracts.
   *
   * @param profileId The ID of the profile (client or contractor).
   * @returns A promise that resolves to a list of unpaid jobs.
   */
  fetchUnpaidJobsByProfileId(profileId: number): Promise<JobEntity[]>;

  /**
   * Processes payment for a job. Moves the payment amount from the client's balance
   * to the contractor's balance if the client's balance is sufficient.
   *
   * @param clientId The ID of the client that is paying the contractor.
   * @param jobId The ID of the job to pay for.
   * @returns A promise that resolves when the payment is successfully processed.
   */
  payForJobIfClientHasSufficientBalance(
    clientId: number,
    jobId: number
  ): Promise<JobEntity>;
}
