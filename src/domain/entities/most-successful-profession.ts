export class MostSuccessfulProfessionEntity {
  profession: string;
  totalJobs: number;
  averageEarningsPerJob: number;
  constructor({
    averageEarningsPerJob,
    profession,
    totalJobs,
  }: {
    profession: string;
    totalJobs: number;
    averageEarningsPerJob: number;
  }) {
    this.averageEarningsPerJob = averageEarningsPerJob;
    this.profession = profession;
    this.totalJobs = totalJobs;
  }
}
