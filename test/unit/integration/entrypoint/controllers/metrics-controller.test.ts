import { TopEarningProfessionMetricsEntity } from "../../../../../src/domain/entities/top-earning-profession-metrics";
import { TopPayingClientEntity } from "../../../../../src/domain/entities/top-paying-client";
import { ProfileRepositoryAdapter } from "../../../../../src/integration/adapters/profile-repository";
import { MetricsController } from "../../../../../src/integration/entrypoint/controllers/metrics-controller";
import { ListQueryDto } from "../../../../../src/integration/entrypoint/dtos/list-query";
import { TopEarningProfessionMetricsDto } from "../../../../../src/integration/entrypoint/dtos/top-earning-profession-metrics";
import { TopPayingClientDto } from "../../../../../src/integration/entrypoint/dtos/top-paying-client";

describe("MetricsController", () => {
  let profileRepositoryMock: jest.Mocked<ProfileRepositoryAdapter>;
  let metricsController: MetricsController;

  beforeEach(() => {
    profileRepositoryMock = {
      getTopEarningProfessionMetrics: jest.fn(),
      getTopPayingClients: jest.fn(),
    } as unknown as jest.Mocked<ProfileRepositoryAdapter>;

    metricsController = new MetricsController(profileRepositoryMock);
  });

  describe("getMostSuccessfulProfession", () => {
    it("should return the most successful profession metrics", async () => {
      const listQueryDto = new ListQueryDto({});
      const mockEntity: TopEarningProfessionMetricsEntity = {
        profession: "Engineer",
        totalEarnings: 10000,
        averageEarningsPerJob: 123,
        totalJobs: 2,
      };
      profileRepositoryMock.getTopEarningProfessionMetrics.mockResolvedValue(
        mockEntity
      );

      const result = await metricsController.getMostSuccessfulProfession(
        listQueryDto
      );

      expect(
        profileRepositoryMock.getTopEarningProfessionMetrics
      ).toHaveBeenCalledWith(listQueryDto.toEntity());
      expect(result).toBeInstanceOf(TopEarningProfessionMetricsDto);
      expect(result.profession).toBe(mockEntity.profession);
      expect(result.totalEarnings).toBe(mockEntity.totalEarnings);
    });

    it("should throw an error if the repository call fails", async () => {
      const listQueryDto = new ListQueryDto({});
      profileRepositoryMock.getTopEarningProfessionMetrics.mockRejectedValue(
        new Error("Repository error")
      );

      await expect(
        metricsController.getMostSuccessfulProfession(listQueryDto)
      ).rejects.toThrow("Repository error");
    });
  });

  describe("listTopPayingClients", () => {
    it("should return a list of top-paying clients", async () => {
      const listQueryDto = new ListQueryDto({});
      const mockEntities: TopPayingClientEntity[] = [
        {
          fullName: "abra cadabra",
          id: 1,
          paid: 12,
        },
        {
          fullName: "abra cadabra 2",
          id: 2,
          paid: 10,
        },
      ];
      profileRepositoryMock.getTopPayingClients.mockResolvedValue(mockEntities);

      const result = await metricsController.listTopPayingClients(listQueryDto);

      expect(profileRepositoryMock.getTopPayingClients).toHaveBeenCalledWith(
        listQueryDto.toEntity()
      );
      expect(result).toHaveLength(mockEntities.length);
      expect(result[0]).toBeInstanceOf(TopPayingClientDto);
      expect(result[0].fullName).toBe(mockEntities[0].fullName);
      expect(result[0].paid).toBe(mockEntities[0].paid);
    });

    it("should throw an error if the repository call fails", async () => {
      const listQueryDto = new ListQueryDto({});
      profileRepositoryMock.getTopPayingClients.mockRejectedValue(
        new Error("Repository error")
      );

      await expect(
        metricsController.listTopPayingClients(listQueryDto)
      ).rejects.toThrow("Repository error");
    });
  });
});
