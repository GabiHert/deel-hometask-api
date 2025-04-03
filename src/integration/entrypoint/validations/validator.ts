import Joi from "joi";
import { ErrorDetail } from "../../../domain/errors/application-base-error";
import { BadRequest } from "../errors/bad-request";

export abstract class JoiValidator {
  constructor(private readonly errorMessage: string) {
    this.validate = this.validate.bind(this);
  }

  protected abstract validationStrategy(input: any): Joi.ValidationResult;

  async validate(input: any): Promise<void> {
    const { error } = this.validationStrategy(input);
    if (error) {
      const errorDetails: ErrorDetail[] = error.details.map((detail: any) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));
      throw new BadRequest(this.errorMessage, errorDetails);
    }
  }
}
