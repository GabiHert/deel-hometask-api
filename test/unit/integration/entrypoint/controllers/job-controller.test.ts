import { PayJobUseCaseAdapter } from "../../../../../src/application/adapter/pay-job-use-case";
import { JobEntity } from "../../../../../src/domain/entities/job";
import { JobRepositoryAdapter } from "../../../../../src/integration/adapters/job-repository";
import { JobController } from "../../../../../src/integration/entrypoint/controllers/job-controller";
import { JobDto } from "../../../../../src/integration/entrypoint/dtos/job";

describe("JobController", () => {
  let jobRepositoryMock: jest.Mocked<JobRepositoryAdapter>;
  let payJobUseCaseMock: jest.Mocked<PayJobUseCaseAdapter>;
  let jobController: JobController;

  beforeEach(() => {
    jobRepositoryMock = {
      fetchUnpaidJobsByProfileId: jest.fn(),
    } as unknown as jest.Mocked<JobRepositoryAdapter>;

    payJobUseCaseMock = {
      payJob: jest.fn(),
    } as unknown as jest.Mocked<PayJobUseCaseAdapter>;

    jobController = new JobController(jobRepositoryMock, payJobUseCaseMock);
  });

  describe("listUnpaidJobs", () => {
    it("should return a list of unpaid jobs for a given profile ID", async () => {
      const profileId = 1;
      const unpaidJobs: JobEntity[] = [
        {
          id: 1,
          description: "Job 1",
          price: 100,
          contractId: 12,
          paid: false,
          paymentDate: undefined,
        },
        {
          id: 2,
          description: "Job 2",
          price: 1002,
          contractId: 122,
          paid: false,
          paymentDate: undefined,
        },
      ];
      jobRepositoryMock.fetchUnpaidJobsByProfileId.mockResolvedValue(
        unpaidJobs
      );

      const result = await jobController.listUnpaidJobs(profileId);

      expect(jobRepositoryMock.fetchUnpaidJobsByProfileId).toHaveBeenCalledWith(
        profileId
      );
      expect(result).toEqual(JobDto.FromEntities(unpaidJobs));
    });

    it("should throw an error if fetching unpaid jobs fails", async () => {
      const profileId = 1;
      jobRepositoryMock.fetchUnpaidJobsByProfileId.mockRejectedValue(
        new Error("Database error")
      );

      await expect(jobController.listUnpaidJobs(profileId)).rejects.toThrow(
        "Database error"
      );
      expect(jobRepositoryMock.fetchUnpaidJobsByProfileId).toHaveBeenCalledWith(
        profileId
      );
    });
  });

  describe("payJob", () => {
    it("should process payment for a specific job and return the updated job details", async () => {
      const profileId = 1;
      const jobId = 1;
      const updatedJob = {
        id: 1,
        description: "Job 1",
        price: 100,
        contractId: 12,
        paid: false,
        paymentDate: new Date(),
      };

      payJobUseCaseMock.payJob.mockResolvedValue(updatedJob);

      const result = await jobController.payJob(profileId, jobId);

      expect(payJobUseCaseMock.payJob).toHaveBeenCalledWith(profileId, jobId);
      expect(result).toEqual(new JobDto(updatedJob));
    });

    it("should throw an error if payment processing fails", async () => {
      const profileId = 1;
      const jobId = 1;
      payJobUseCaseMock.payJob.mockRejectedValue(new Error("Payment error"));

      await expect(jobController.payJob(profileId, jobId)).rejects.toThrow(
        "Payment error"
      );
      expect(payJobUseCaseMock.payJob).toHaveBeenCalledWith(profileId, jobId);
    });
  });
});
