export class TopEarningProfessionMetricsDto {
  profession: string;
  totalJobs: number;
  averageEarningsPerJob: number;
  constructor({
    averageEarningsPerJob,
    profession,
    totalJobs,
  }: TopEarningProfessionMetricsDto) {
    this.averageEarningsPerJob = averageEarningsPerJob;
    this.profession = profession;
    this.totalJobs = totalJobs;
  }
}
