import { JobEntity } from "../../domain/entities/job";

/**
 * Interface for the "Pay Job" use case.
 *
 * This use case handles the payment of a job by a client. A client can only pay for a job if:
 * - Their balance is greater than or equal to the amount due for the job.
 *
 * Upon successful payment:
 * - The payment amount is deducted from the client's balance.
 * - The payment amount is added to the contractor's balance.
 */
export interface PayJobUseCaseAdapter {
  /**
   * Pays for a job.
   *
   * @param profileId - The ID of the client's profile initiating the payment.
   * @param jobId - The ID of the job to be paid.
   * @returns A promise that resolves to the updated JobEntity after payment.
   * @throws An error if the client's balance is insufficient or if the payment fails.
   */
  payJob(profileId: number, jobId: number): Promise<JobEntity>;
}
