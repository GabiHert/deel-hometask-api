import { ApplicationBaseError } from "./application-base-error";

export class JobNotFoundError extends ApplicationBaseError {
  constructor(message: string) {
    super("Job not found", message, 404);
  }
}
