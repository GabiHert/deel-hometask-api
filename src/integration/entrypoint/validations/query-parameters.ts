import joi from "joi";
import { JoiValidator } from "./validator";

export class QueryParametersValidator extends JoiValidator {
  private readonly schema = joi.object({
    start: joi.string().isoDate(),
    end: joi
      .string()
      .isoDate()
      .custom((value, helpers) => {
        const startDate = new Date(helpers.state.ancestors[0].start);
        const endDate = new Date(value);

        if (endDate <= startDate) {
          return helpers.error("greater than start", { value });
        }
        return value;
      }, "Custom end date validation")
      .messages({
        "greater than start": '"end" must be greater than "start"',
      }),
    page: joi.number().greater(0),
    limit: joi.number().greater(0),
  });

  protected validationStrategy(input: any): joi.ValidationResult {
    return this.schema.validate(input);
  }

  constructor() {
    super("Invalid query parameters");
  }
}
