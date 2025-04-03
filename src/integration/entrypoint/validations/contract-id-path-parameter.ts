import joi from "joi";
import { JoiValidator } from "./validator";

export class ContractIdPathParameterValidator extends JoiValidator {
  private readonly schema = joi.object({
    contractId: joi.number().greater(0).required(),
  });
  protected validationStrategy(input: any): joi.ValidationResult {
    return this.schema.validate(input);
  }
  constructor() {
    super("Invalid path parameters");
  }
}

