export class MostSuccessfulProfessionDto {
  profession: string;
  totalJobs: number;
  averageEarningsPerJob: number;
  constructor({
    averageEarningsPerJob,
    profession,
    totalJobs,
  }: MostSuccessfulProfessionDto) {
    this.averageEarningsPerJob = averageEarningsPerJob;
    this.profession = profession;
    this.totalJobs = totalJobs;
  }
}
