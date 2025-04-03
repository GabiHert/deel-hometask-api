export class TopEarningProfessionMetricsEntity {
  profession: string;
  totalJobs: number;
  averageEarningsPerJob: number;
  totalEarnings: number;
  constructor({
    averageEarningsPerJob,
    profession,
    totalJobs,
    totalEarnings,
  }: {
    totalEarnings: number;
    profession: string;
    totalJobs: number;
    averageEarningsPerJob: number;
  }) {
    this.averageEarningsPerJob = averageEarningsPerJob;
    this.profession = profession;
    this.totalJobs = totalJobs;
    this.totalEarnings = totalEarnings;
  }
}
