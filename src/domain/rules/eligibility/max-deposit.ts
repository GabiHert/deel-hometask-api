import Decimal from "decimal.js";
import { MaxClientDepositError } from "../../errors/max-client-deposit";
import { EligibilityRule } from "../eligibility-rule";

export class MaxDepositRule extends EligibilityRule {
  protected isEligible(
    totalUnpaidJobsAmount: number,
    depositAmount: number
  ): boolean {
    const totalAllowed = new Decimal(totalUnpaidJobsAmount)
      .mul(0.25)
      .toFixed(2);
    if (new Decimal(depositAmount).toFixed(2) > totalAllowed) {
      throw new MaxClientDepositError(
        `deposit amount of ${depositAmount} exceeds the maximum allowed limit, which is 25% of the total unpaid jobs amount (${totalAllowed}).`
      );
    }
    return true;
  }
}
