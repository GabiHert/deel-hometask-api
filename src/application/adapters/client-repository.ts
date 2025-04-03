import { ProfileEntity } from "../../domain/entities/profile";
import { EligibilityRule } from "../../domain/rules/eligibility-rule";

export interface ClientRepositoryAdapter {
  depositToClientIfEligible(
    clientId: number,
    depositAmount: number,
    eligibilityRules: EligibilityRule
  ): Promise<ProfileEntity>;
}
