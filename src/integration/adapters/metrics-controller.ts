import { ListQueryDto } from "../entrypoint/dtos/list-query";
import { TopEarningProfessionMetricsDto } from "../entrypoint/dtos/top-earning-profession-metrics";
import { TopPayingClientDto } from "../entrypoint/dtos/top-paying-client";

/**
 * Interface representing a controller adapter for handling various operations.
 */
export interface MetricsControllerAdapter {
  /**
   * Retrieves the most successful profession within a specified date range.
   * @param start - The start date of the range (optional).
   * @param end - The end date of the range (optional).
   * @returns A promise that resolves to the details of the most successful profession.
   */
  getMostSuccessfulProfession(
    listQuery: ListQueryDto
  ): Promise<TopEarningProfessionMetricsDto>;

  /**
   * Retrieves the best clients within a specified date range, optionally limited by a maximum number.
   * @param listQuery - An object containing optional query parameters to filter, sort, or customize the search results.   * @returns A promise that resolves to a list of the best clients.
   * @returns A promise that resolves to a list of the top paying clients.
   */
  listTopPayingClients(listQuery: ListQueryDto): Promise<TopPayingClientDto[]>;
}
