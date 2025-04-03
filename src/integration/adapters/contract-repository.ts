import { ContractEntity } from "../../domain/entities/contract";

/**
 * Adapter interface for interacting with contract data sources.
 * Provides methods to fetch contract information based on various criteria.
 */
export interface ContractRepositoryAdapter {
  /**
   * Fetches a contract by its ID and associated profile ID.
   *
   * @param profileId The ID of the profile (client or contractor) associated with the contract.
   * @param id The ID of the contract to fetch.
   * @returns A promise that resolves to the contract with the given ID and profile ID.
   */
  getContractById(profileId: number, id: number): Promise<ContractEntity>;

  /**
   * Fetches a list of contracts associated with a specific profile ID.
   *
   * @param profileId The ID of the profile (client or contractor) whose contracts are to be fetched.
   * @returns A promise that resolves to a list of contracts belonging to the specified profile.
   *          The list will only include contracts that are not terminated.
   */
  listActiveContractsByProfileId(profileId: number): Promise<ContractEntity[]>;
}
