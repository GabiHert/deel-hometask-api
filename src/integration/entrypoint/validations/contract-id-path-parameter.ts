import joi from "joi";
import { JoiValidator } from "./validator";

export class ContractIdPathParameterValidator extends JoiValidator {
  private readonly schema = joi.object({
    contractId: joi.number().greater(0).required(),
  });
  validationStrategy(
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
