import { JobDto } from "../entrypoint/dtos/job";

/**
 * Interface representing a controller adapter for handling various operations.
 */
export interface JobControllerAdapter {
  /**
   * Lists all unpaid jobs for a specific profile.
   * @param profileId - The ID of the profile whose unpaid jobs are to be listed.
   * @returns A promise that resolves to the details of all unpaid jobs.
   */
  listUnpaidJobs(profileId: number): Promise<JobDto[]>;

  /**
   * Processes payment for a specific job.
   * @param profileId - The ID of the profile making the payment.
   * @param jobId - The ID of the job to be paid for.
   * @returns A promise that resolves to the details of the paid job.
   */
  payJob(profileId: number, jobId: number): Promise<JobDto>;
}
