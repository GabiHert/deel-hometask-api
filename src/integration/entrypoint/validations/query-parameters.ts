import joi from "joi";
import { JoiValidator } from "./validator";

export class QueryParametersValidator extends JoiValidator {
  private readonly schema = joi.object({
    start: joi
      .string()
      .pattern(/^\d{2}-\d{2}-\d{4}$/, "MM-DD-YYYY format")
      .custom((value, helpers) => {
        const startDate = new Date(value);
        if (isNaN(startDate.getTime())) {
          return helpers.error("invalid-date", { value });
        }
      }, "Custom start date validation")
      .messages({
        "string.pattern.base": '"start" must be in the format MM-DD-YYYY',
        "invalid-date": '"start" must be a valid date',
      }),
    end: joi
      .string()
      .pattern(/^\d{2}-\d{2}-\d{4}$/, "MM-DD-YYYY format")
      .custom((value, helpers) => {
        const startDate = new Date(helpers.state.ancestors[0].start);
        const endDate = new Date(value);
        if (isNaN(endDate.getTime())) {
          return helpers.error("invalid-date", { value });
        }
        if (endDate <= startDate) {
          return helpers.error("greater than start", { value });
        }
        return value;
      }, "Custom end date validation")
      .messages({
        "greater than start": '"end" must be greater than "start"',
        "string.pattern.base": '"end" must be in the format MM-DD-YYYY',
        "invalid-date": '"end" must be a valid date',
      }),
    page: joi.number().greater(0),
    limit: joi.number().greater(0),
  });

  validationStrategy(
    _path?: any,
    _body?: any,
    query?: any
  ): joi.ValidationResult {
    return this.schema.validate(query);
  }

  constructor() {
    super("Invalid query parameters");
  }
}
