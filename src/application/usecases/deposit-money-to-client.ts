import { ClientDepositEntity } from "../../domain/entities/client-deposit";
import { ProfileEntity } from "../../domain/entities/profile";
import { eligibilityRules } from "../../domain/rules/eligibility-rule";
import { ClientRepositoryAdapter } from "../adapters/client-repository";
import { DepositToClientUseCaseAdapter } from "../adapters/deposit-money-to-client-use-case";

export class DepositMoneyToClientUseCase
  implements DepositToClientUseCaseAdapter
{
  constructor(private readonly clientRepository: ClientRepositoryAdapter) {}
  async deposit(
    profileId: number,
    clientDeposit: ClientDepositEntity
  ): Promise<ProfileEntity> {
    const clientUpdated = await this.clientRepository.depositToClientIfEligible(
      profileId,
      clientDeposit.amount,
      eligibilityRules
    );

    return clientUpdated;
  }
}
