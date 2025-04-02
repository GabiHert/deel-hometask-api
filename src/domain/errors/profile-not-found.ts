import { ApplicationBaseError } from "./application-base-error";

export class ProfileNotFoundError extends ApplicationBaseError {
  constructor(message: string) {
    super("Profile not found", message, 404);
  }
}
