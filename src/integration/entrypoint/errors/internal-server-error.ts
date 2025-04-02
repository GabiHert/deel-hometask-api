import { ApplicationBaseError } from "../../../domain/errors/application-base-error";

export class InternalServerError extends ApplicationBaseError {
  constructor(message: string) {
    super("Internal Server Error", message, 500);
  }
}
