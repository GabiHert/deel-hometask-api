import { TopPayingClientEntity } from "../../../domain/entities/top-paying-client";
import { MetricsControllerAdapter } from "../../adapters/metrics-controller";
import { ProfileRepositoryAdapter } from "../../adapters/profile-repository";
import { ListQueryDto } from "../dtos/list-query";
import { TopEarningProfessionMetricsDto } from "../dtos/top-earning-profession-metrics";
import { TopPayingClientDto } from "../dtos/top-paying-client";

export class MetricsController implements MetricsControllerAdapter {
  constructor(private readonly profileRepository: ProfileRepositoryAdapter) {}
  async getMostSuccessfulProfession(
    listQuery: ListQueryDto
  ): Promise<TopEarningProfessionMetricsDto[]> {
    const listQueryEntity = listQuery.toEntity();
    const topEarningProfessionMetrics =
      await this.profileRepository.getTopEarningProfessionMetrics(
        listQueryEntity
      );

    return TopEarningProfessionMetricsDto.FromEntities(
      topEarningProfessionMetrics
    );
  }
  async listTopPayingClients(
    listQuery: ListQueryDto
  ): Promise<TopPayingClientDto[]> {
    const listQueryEntity = listQuery.toEntity();

    const bestClients = await this.profileRepository.getTopPayingClients(
      listQueryEntity
    );

    return TopPayingClientEntity.FromEntities(bestClients);
  }
}
