import { ApplicationBaseError } from "./application-base-error";

export class MaxClientDepositError extends ApplicationBaseError {
  constructor(message: string) {
    super("Deposit exceeds the maximum allowed limit.", message, 422);
  }
}
