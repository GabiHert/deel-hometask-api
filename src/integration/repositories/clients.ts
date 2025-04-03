import Decimal from "decimal.js";
import { ClientRepositoryAdapter } from "../../application/adapters/client-repository";
import { ProfileEntity } from "../../domain/entities/profile";
import { ProfileTypeEnum } from "../../domain/enums/profile-type";
import { ProfileNotFoundError } from "../../domain/errors/profile-not-found";
import { EligibilityRule } from "../../domain/rules/eligibility-rule";
import { connection } from "../../infra/db";
import { JobRepositoryAdapter } from "../adapters/job-repository";
import { ProfileModel } from "./models";

export class ClientRepository implements ClientRepositoryAdapter {
    constructor(private readonly jobsRepository: JobRepositoryAdapter) {}

    async depositToClientIfEligible(
        clientId: number,
        depositAmount: number,
        eligibilityRules: EligibilityRule
    ): Promise<ProfileEntity> {
        // Start a transaction
        return await connection.transaction(async (trx) => {
            const unpaidJobs = await this.jobsRepository.fetchUnpaidJobsByProfileId(
                clientId
            );

            const totalUnpaidJobsAmount = unpaidJobs.reduce(
                (total, job) => total.plus(job.price),
                new Decimal(0)
            );

            const isEligible = eligibilityRules.check(
                totalUnpaidJobsAmount.toNumber(),
                depositAmount
            );
            if (!isEligible) {
                throw new Error("Client is not eligible for the deposit.");
            }

            const clientProfile = await this.getClientProfileById(clientId, trx);
            if (!clientProfile) {
                throw new ProfileNotFoundError(`client with id ${clientId} not found`);
            }

            clientProfile.balance += depositAmount;

            await this.updateClientProfile(clientProfile, trx);

            return clientProfile;
        });
    }

    private async getClientProfileById(
        clientId: number,
        trx: any
    ): Promise<ProfileEntity | null> {
        const profile = await ProfileModel.findOne({
            where: { id: clientId, type: ProfileTypeEnum.CLIENT },
            transaction: trx,
        });

        if (!profile) {
            return null;
        }
        return ProfileModel.ToEntity(profile);
    }

    private async updateClientProfile(
        profile: ProfileEntity,
        trx: any
    ): Promise<void> {
        await ProfileModel.update(
            { balance: profile.balance },
            { where: { id: profile.id }, transaction: trx }
        );
    }
}
