import { JobControllerAdapter } from "../../adapters/job-controller";
import { JobRepositoryAdapter } from "../../adapters/job-repository";
import { JobDto } from "../dtos/job";

export class JobController implements JobControllerAdapter {
  constructor(private readonly jobsRepository: JobRepositoryAdapter) {}
  async listUnpaidJobs(profileId: number): Promise<JobDto[]> {
    const unpaidJobs = await this.jobsRepository.fetchUnpaidJobsByProfileId(
      profileId
    );
    return JobDto.FromEntities(unpaidJobs);
  }
  async payJob(profileId: number, jobId: number): Promise<JobDto> {
    const updatedJob =
      await this.jobsRepository.payForJobIfClientHasSufficientBalance(
        profileId,
        jobId
      );
    return new JobDto(updatedJob);
  }

  static buildWhereClauseForPaymentDate(
    start?: Date,
    end?: Date
  ): { whereClause: string; replacements: Record<string, any> } {
    let whereClause = "WHERE Jobs.paid = true";
    const replacements: Record<string, any> = {};

    if (start && end) {
      whereClause += ` AND Jobs.paymentDate BETWEEN :start AND :end`;
      replacements.start = start.toISOString();
      replacements.end = end.toISOString();
    } else if (start) {
      whereClause += ` AND Jobs.paymentDate >= :start`;
      replacements.start = start.toISOString();
    } else if (end) {
      whereClause += ` AND Jobs.paymentDate <= :end`;
      replacements.end = end.toISOString();
    }

    return { whereClause, replacements };
  }
}
