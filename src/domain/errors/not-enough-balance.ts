import { ApplicationBaseError } from "./application-base-error";

export class NotEnoughBalanceError extends ApplicationBaseError {
  constructor(message: string) {
    super("Not enough balance", message, 422);
  }
}
