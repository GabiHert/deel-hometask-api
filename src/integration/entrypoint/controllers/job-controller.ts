import { PayJobUseCaseAdapter } from "../../../application/adapter/pay-job-use-case";
import { JobControllerAdapter } from "../../adapters/job-controller";
import { JobRepositoryAdapter } from "../../adapters/job-repository";
import { JobDto } from "../dtos/job";

export class JobController implements JobControllerAdapter {
  constructor(
    private readonly jobsRepository: JobRepositoryAdapter,
    private readonly payJobUseCase: PayJobUseCaseAdapter
  ) {}
  async listUnpaidJobs(profileId: number): Promise<JobDto[]> {
    const unpaidJobs = await this.jobsRepository.fetchUnpaidJobsByProfileId(
      profileId
    );
    return JobDto.FromEntities(unpaidJobs);
  }
  async payJob(profileId: number, jobId: number): Promise<JobDto> {
    const updatedJob = await this.payJobUseCase.payJob(profileId, jobId);
    return new JobDto(updatedJob);
  }
}
