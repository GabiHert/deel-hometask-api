import { ApplicationBaseError } from "./application-base-error";

export class ContractFoundError extends ApplicationBaseError {
  constructor(message: string) {
    super("Contract not found", message, 404);
  }
}
