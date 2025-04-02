import { ApplicationBaseError } from "../../../domain/errors/application-base-error";

export class UnauthorizedError extends ApplicationBaseError {
  constructor(message: string) {
    super("Unauthorized", message, 401);
  }
}
