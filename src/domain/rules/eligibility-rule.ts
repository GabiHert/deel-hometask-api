export abstract class EligibilityRule {
  private nextRule?: EligibilityRule;

  setNext(rule: EligibilityRule): EligibilityRule {
    this.nextRule = rule;
    return rule;
  }

  check(totalUnpaidJobsAmount: number, depositAmount: number): boolean {
    if (!this.isEligible(totalUnpaidJobsAmount, depositAmount)) {
      return false;
    }
    return this.nextRule
      ? this.nextRule.check(totalUnpaidJobsAmount, depositAmount)
      : true;
  }

  protected abstract isEligible(
    totalUnpaidJobsAmount: number,
    depositAmount: number
  ): boolean;
}
