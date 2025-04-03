import { MaxClientDepositError } from "../../errors/max-client-deposit";
import { EligibilityRule } from "../eligibility-rule";

export class MaxDepositRule extends EligibilityRule {
  protected isEligible(
    totalUnpaidJobsAmount: number,
    depositAmount: number
  ): boolean {
    const totalAllowed = totalUnpaidJobsAmount * 0.25;
    if (depositAmount <= totalAllowed) {
      throw new MaxClientDepositError(
        `Deposit amount of ${depositAmount} exceeds the maximum allowed limit, which is 25% of the total unpaid jobs amount (${totalAllowed}).`
      );
    }
    return true;
  }
}
