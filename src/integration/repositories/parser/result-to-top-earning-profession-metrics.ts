import { TopEarningProfessionMetricsEntity } from "../../../domain/entities/top-earning-profession-metrics";

export function parseResultToTopEarningProfessionMetricsEntity(
  results: any[]
): TopEarningProfessionMetricsEntity[] {
  return results.map(
    (result: any) =>
      new TopEarningProfessionMetricsEntity({
        profession: result.profession,
        totalEarnings: result.totalEarnings,
        averageEarningsPerJob: result.averageEarningsPerJob,
        totalJobs: result.totalJobs,
      })
  );
}
