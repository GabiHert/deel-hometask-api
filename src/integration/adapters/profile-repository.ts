import { ListQueryEntity } from "../../domain/entities/list-query";
import { ProfileEntity } from "../../domain/entities/profile";
import { TopEarningProfessionMetricsEntity } from "../../domain/entities/top-earning-profession-metrics";
import { TopPayingClientEntity } from "../../domain/entities/top-paying-client";

/**
 * Interface representing a repository for managing profile-related data.
 */
export interface ProfileRepositoryAdapter {
  /**
   * Retrieves a profile by its unique identifier.
   *
   * @param profileId - The unique identifier of the profile.
   * @returns A promise that resolves to the profile entity.
   */
  findProfileById: (profileId: number) => Promise<ProfileEntity>;

  /**
   * Returns the clients who paid the most for jobs within the specified time period.
   *
   * @param listQuery - An object containing optional query parameters to filter, sort, or customize the search results.
   * @returns A promise that resolves to an array of profile entities representing the most successful clients.
   */
  getTopPayingClients: (
    listQuery: ListQueryEntity
  ) => Promise<TopPayingClientEntity[]>;

  /**
   * Returns the profession that earned the most money (sum of jobs paid) for any contractor
   * who worked within the specified time range.
   *
   * @param listQuery - An object containing optional query parameters to filter, sort, or customize the search results.
   * @returns A promise that resolves to the the profession metrics list.
   */
  getTopEarningProfessionMetrics: (
    listQuery: ListQueryEntity
  ) => Promise<TopEarningProfessionMetricsEntity[]>;

  /**
   * Deposits money into a client's balance.
   *
   * @param profileId - The unique identifier of the profile.
   * @param amount - The amount of money to deposit.
   * @returns A promise that resolves to the updated profile entity.
   */
  depositToProfileBalance: (
    clientId: number,
    amount: number
  ) => Promise<ProfileEntity>;
}
