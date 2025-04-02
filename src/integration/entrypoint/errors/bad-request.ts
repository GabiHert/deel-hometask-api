import {
  ApplicationBaseError,
  ErrorDetail,
} from "../../../domain/errors/application-base-error";

export class BadRequest extends ApplicationBaseError {
  constructor(message: string, errorDetails: ErrorDetail[]) {
    super("Bad Request", message, 400, errorDetails);
  }
}
