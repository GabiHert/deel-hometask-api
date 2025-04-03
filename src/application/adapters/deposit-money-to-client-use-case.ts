import { ClientDepositEntity } from "../../domain/entities/client-deposit";
import { ProfileEntity } from "../../domain/entities/profile";

/**
 * Interface representing the use case for depositing money into a client's balance.
 *
 * @remarks
 * A client cannot deposit more than 25% of the total of jobs to pay at the time of deposit.
 */
export interface DepositToClientUseCaseAdapter {
  /**
   * Adds a specified amount to the client's account balance.
   *
   * @param profileId - The unique identifier of the client's profile.
   * @param clientDeposit - An object containing details of the deposit, including the amount.
   * @returns A promise that resolves to the updated profile entity after the deposit is successfully processed.
   */
  deposit(
    profileId: number,
    clientDeposit: ClientDepositEntity
  ): Promise<ProfileEntity>;
}
