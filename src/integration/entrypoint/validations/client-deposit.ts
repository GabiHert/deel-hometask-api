import joi from "joi";
import { JoiValidator } from "./validator";

export class ClientDepositBodyValidator extends JoiValidator {
  private readonly schema = joi.object({
    amount: joi.number().greater(0).precision(2).required(),
  });
  validationStrategy(
    _path?: any,
    body?: any,
    _query?: any
  ): joi.ValidationResult {
    return this.schema.validate(body);
  }
  constructor() {
    super("Invalid input body");
  }
}
