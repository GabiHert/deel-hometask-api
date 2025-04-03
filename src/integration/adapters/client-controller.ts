import { ClientDepositDto } from "../entrypoint/dtos/client-deposit";
import { ProfileDto } from "../entrypoint/dtos/profile";

/**
 * Interface representing a controller adapter for handling various operations.
 */
export interface ClientControllerAdapter {
  /**
   * Deposits funds to a client's account.
   * @param profileId - The ID of the profile making the deposit.
   * @param clientDeposit - The details of the deposit transaction.
   * @returns A promise that resolves to the details of the deposit transaction.
   */
  depositToClient(
    profileId: number,
    clientDeposit: ClientDepositDto
  ): Promise<ProfileDto>;
}
