import joi from "joi";
import { JoiValidator } from "./validator";

export class ClientDepositValidator extends JoiValidator {
  private readonly schema = joi.object({
    amount: joi.number().greater(1).required(),
  });
  protected validationStrategy(input: any): joi.ValidationResult {
    return this.schema.validate(input);
  }
  constructor() {
    super("Invalid input body");
  }
}
