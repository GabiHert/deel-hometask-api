import Decimal from "decimal.js";
import { JobEntity } from "../../domain/entities/job";
import { ContractStatusEnum } from "../../domain/enums/contract-status";
import { ProfileTypeEnum } from "../../domain/enums/profile-type";
import { connection } from "../../infra/db";
import { JobRepositoryAdapter } from "../adapters/job-repository";
import { ContractModel, JobModel, ProfileModel } from "./models";

export class JobRepository implements JobRepositoryAdapter {
  async fetchUnpaidJobsByProfileId(profileId: number): Promise<JobEntity[]> {
    const unpaidJobs = await JobModel.findAll({
      where: {
        paid: false,
      },
      include: [
        {
          model: ContractModel,
          required: true,
          where: {
            status: ContractStatusEnum.IN_PROGRESS,
          },
          include: [
            {
              model: ProfileModel,
              as: "Client",
              where: { id: profileId },
              required: false,
            },
            {
              model: ProfileModel,
              as: "Contractor",
              where: { id: profileId },
              required: false,
            },
          ],
        },
      ],
    });

    return JobModel.ToEntities(unpaidJobs);
  }

  async payForJobIfClientHasSufficientBalance(
    clientId: number,
    jobId: number
  ): Promise<JobEntity> {
    return await connection.transaction(async (trx) => {
      const job = await this.fetchJobWithClient(jobId, clientId);

      this.validateJobAndClient(job);

      const updatedBalance = this.calculateUpdatedBalance(
        job.dataValues.Contract.Client.dataValues.balance,
        job.dataValues.price
      );

      await this.updateClientBalance(clientId, updatedBalance, trx);

      const updatedJob = await this.markJobAsPaid(jobId, trx);

      return JobModel.ToEntity(updatedJob);
    });
  }

  private async fetchJobWithClient(jobId: number, clientId: number) {
    const job = await JobModel.findOne({
      where: { id: jobId },
      include: [
        {
          model: ContractModel,
          required: true,
          include: [
            {
              model: ProfileModel,
              as: "Client",
              where: { id: clientId, type: ProfileTypeEnum.CLIENT },
              required: true,
            },
          ],
        },
      ],
    });

    if (!job) {
      throw new Error("Job or Client not found");
    }

    return job;
  }

  private validateJobAndClient(job: any): void {
    if (job.dataValues.paid) {
      throw new Error("Job is already paid");
    }

    const client = job.dataValues.Contract.Client;
    if (client.dataValues.balance < job.dataValues.price) {
      throw new Error("Insufficient balance");
    }
  }

  private calculateUpdatedBalance(
    clientBalance: number,
    jobPrice: number
  ): Decimal {
    return new Decimal(clientBalance).minus(jobPrice);
  }

  private async updateClientBalance(
    clientId: number,
    updatedBalance: Decimal,
    trx: any
  ): Promise<void> {
    await ProfileModel.update(
      { balance: updatedBalance.toNumber() },
      { where: { id: clientId }, transaction: trx }
    );
  }

  private async markJobAsPaid(jobId: number, trx: any): Promise<any> {
    const [_, [updatedJob]] = await JobModel.update(
      { paid: true, paymentDate: new Date() },
      { where: { id: jobId }, transaction: trx, returning: true }
    );

    return updatedJob;
  }
}
