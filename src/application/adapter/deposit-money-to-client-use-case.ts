import { ProfileEntity } from "../../domain/entities/profile";

/**
 * Interface representing the use case for depositing money into a client's balance.
 *
 * @remarks
 * A client cannot deposit more than 25% of the total of jobs to pay at the time of deposit.
 */
export interface DepositToClientUseCaseAdapter {
  /**
   * Processes the payment for a job associated with a specific profile and client.
   *
   * @param profileId - The unique identifier of the profile associated with the job.
   * @param clientId - The unique identifier of the client making the payment.
   * @returns A promise that resolves to the updated profile entity after the payment is processed.
   */
  payJob(profileId: number, clientId: number): Promise<ProfileEntity>;
}
