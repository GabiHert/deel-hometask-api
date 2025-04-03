import Decimal from "decimal.js";
import sequelize from "sequelize";
import { ListQueryEntity } from "../../domain/entities/list-query";
import { ProfileEntity } from "../../domain/entities/profile";
import { TopEarningProfessionMetricsEntity } from "../../domain/entities/top-earning-profession-metrics";
import { TopPayingClientEntity } from "../../domain/entities/top-paying-client";
import { connection } from "../../infra/db";
import { ProfileRepositoryAdapter } from "../adapters/profile-repository";
import { QueryBuilder } from "./builder/query-builder";
import { ProfileModel } from "./models";
import { parseResultToTopEarningProfessionMetricsEntity } from "./parser/result-to-top-earning-profession-metrics";
import { parseResultToTopPayingClientEntity } from "./parser/result-to-top-paying-client-entity";

export class ProfileRepository implements ProfileRepositoryAdapter {
  async findProfileById(profileId: number): Promise<ProfileEntity> {
    const profile = await ProfileModel.findByPk(profileId);
    if (!profile) {
      throw new Error(`Profile with ID ${profileId} not found`);
    }
    return ProfileModel.ToEntity(profile);
  }

  async getTopPayingClients(
    listQuery: ListQueryEntity
  ): Promise<TopPayingClientEntity[]> {
    const { limit, page, start, end } = listQuery;
    const offset = page * limit;
    const { whereClause, replacements: dateReplacements } =
      QueryBuilder.buildWhereClauseForPaymentDate(start, end);

    // Add pagination replacements
    const replacements = { ...dateReplacements, limit, offset };

    const results = await connection.query(
      `
        SELECT
            Clients.id AS clientId,
            Clients.firstName || ' ' || Clients.lastName AS fullName,
            SUM(Jobs.price) AS totalPaid
        FROM Jobs
        INNER JOIN Contracts ON Jobs.ContractId = Contracts.id
        INNER JOIN Profiles AS Clients ON Contracts.ClientId = Clients.id
        ${whereClause}
        GROUP BY Clients.id
        ORDER BY totalPaid DESC
        LIMIT :limit OFFSET :offset
      `,
      {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return parseResultToTopPayingClientEntity(results);
  }

  async getTopEarningProfessionMetrics(
    listQuery: ListQueryEntity
  ): Promise<TopEarningProfessionMetricsEntity[]> {
    const { start, end, limit } = listQuery;

    let { whereClause, replacements } =
      QueryBuilder.buildWhereClauseForPaymentDate(start, end);

    const result = await connection.query(
      `
      SELECT
          Profiles.profession AS profession,
          SUM(Jobs.price) AS totalEarnings,
          COUNT(Jobs.id) AS totalJobs,
          (SUM(Jobs.price) / COUNT(Jobs.id)) AS averageEarningsPerJob
      FROM Jobs
      INNER JOIN Contracts ON Jobs.ContractId = Contracts.id
      INNER JOIN Profiles ON Contracts.ContractorId = Profiles.id
      ${whereClause}
      GROUP BY Profiles.profession
      ORDER BY totalEarnings DESC
      LIMIT ${limit}
      `,
      {
      replacements,
      type: sequelize.QueryTypes.SELECT,
      }
    );

    return parseResultToTopEarningProfessionMetricsEntity(result);
  }

  async depositToProfileBalance(
    clientId: number,
    amount: number
  ): Promise<ProfileEntity> {
    const profile = await ProfileModel.findByPk(clientId);
    if (!profile) {
      throw new Error(`Profile with ID ${clientId} not found`);
    }

    await connection.transaction(async (transaction) => {
      profile.dataValues.balance = new Decimal(profile.dataValues.balance)
        .plus(amount)
        .toNumber();
      await profile.save({ transaction });
    });

    return ProfileModel.ToEntity(profile.dataValues);
  }
}
