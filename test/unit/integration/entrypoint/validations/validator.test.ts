import Joi from "joi";
import { ErrorDetail } from "../../../domain/errors/application-base-error";
import { BadRequest } from "../errors/bad-request";

export class JoiValidator {
  constructor(
    private readonly schema: Joi.Schema,
    private readonly errorMessage: string
  ) {}

  validate(input: any): void {
    const { error } = this.schema.validate(input, { abortEarly: false });
    if (error) {
      const errorDetails: ErrorDetail[] = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));
      throw new BadRequest(this.errorMessage, errorDetails);
    }
  }
}
