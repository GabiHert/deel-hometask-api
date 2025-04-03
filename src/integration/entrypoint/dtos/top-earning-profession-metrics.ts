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
}
