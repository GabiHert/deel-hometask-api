import { ApplicationBaseError } from "../../../domain/errors/application-base-error";

export class NotFound extends ApplicationBaseError {
  constructor(message: string) {
    super("Not Found", message, 404);
  }
}
