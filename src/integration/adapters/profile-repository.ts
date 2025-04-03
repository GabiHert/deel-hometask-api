import { TopEarningProfessionMetrics as TopEarningProfessionMetricsEntity } from "../../domain/entities/top-earning-profession-metrics";
import { ProfileEntity } from "../../domain/entities/profile";

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
   * @param startDate - The start date of the time period.
   * @param endDate - The end date of the time period.
   * @param limit - The maximum number of clients to retrieve.
   * @returns A promise that resolves to an array of profile entities representing the most successful clients.
   */
  getTopPayingClients: (
    startDate: Date,
    endDate: Date,
    limit: number
  ) => Promise<ProfileEntity[]>;

  /**
   * Returns the profession that earned the most money (sum of jobs paid) for any contractor
   * who worked within the specified time range.
   *
   * @param startDate - The start date of the time period.
   * @param endDate - The end date of the time period.
   * @returns A promise that resolves to the the profession metrics.
   */
  getTopEarningProfessionMetrics: (
    startDate?: Date,
    endDate?: Date
  ) => Promise<TopEarningProfessionMetricsEntity>;

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
