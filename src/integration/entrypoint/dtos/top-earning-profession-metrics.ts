import { TopEarningProfessionMetricsEntity } from "../../../domain/entities/top-earning-profession-metrics";

export class TopEarningProfessionMetricsDto {
  profession: string;
  totalJobs: number;
  averageEarningsPerJob: number;
  totalEarnings: number;
  constructor({
    averageEarningsPerJob,
    profession,
    totalJobs,
    totalEarnings,
  }: TopEarningProfessionMetricsDto) {
    this.averageEarningsPerJob = averageEarningsPerJob;
    this.profession = profession;
    this.totalJobs = totalJobs;
    this.totalEarnings = totalEarnings;
  }

  static FromEntities(entities: TopEarningProfessionMetricsEntity[]) {
    return entities.map((e) => new TopEarningProfessionMetricsDto(e));
  }
}
