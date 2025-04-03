import joi from "joi";
import { JoiValidator } from "./validator";

export class JobIdPathParameterValidator extends JoiValidator {
  private readonly schema = joi.object({
    jobId: joi.number().greater(0).required(),
  });
  protected validationStrategy(
    path?: any,
    _body?: any,
    _query?: any
  ): joi.ValidationResult {
    return this.schema.validate(path);
  }
  constructor() {
    super("Invalid path parameters");
  }
}
