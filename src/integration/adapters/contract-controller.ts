import { ContractDto } from "../entrypoint/dtos/contract";

/**
 * Interface representing a controller adapter for handling various operations.
 */
export interface ContractControllerAdapter {
  /**
   * Retrieves a contract by its ID for a specific profile.
   * @param profileId - The ID of the profile requesting the contract.
   * @param contractId - The ID of the contract to retrieve.
   * @returns A promise that resolves to the contract details.
   */
  getContractById(profileId: number, contractId: number): Promise<ContractDto>;

  /**
   * Lists all contracts associated with a specific profile.
   * @param profileId - The ID of the profile whose contracts are to be listed.
   * @returns A promise that resolves to an array of contract details.
   */
  listContracts(profileId: number): Promise<ContractDto[]>;
}
