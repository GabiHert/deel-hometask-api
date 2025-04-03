import { ApplicationBaseError } from "./application-base-error";

export class ContractNotFoundError extends ApplicationBaseError {
  constructor(message: string) {
    super("Contract not found", message, 404);
  }
}
