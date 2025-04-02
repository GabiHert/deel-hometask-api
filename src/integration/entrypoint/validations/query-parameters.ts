import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  start: joi.date(),
  end: joi
    .date()
    .custom((value, helpers) => {
      if (value <= helpers.state.ancestors[0].start) {
        return helpers.error("grater than start", { value });
      }
      return value;
    }, "Custom end date validation")
    .messages({
      "grater than start": '"end" must be greater than "start"',
    }),
  page: joi.number().greater(0),
  limit: joi.number().greater(0),
});

const queryParametersValidator = new JoiValidator(
  schema,
  "Invalid query parameters"
);

export const queryParametersValidation = queryParametersValidator.validate.bind(
  queryParametersValidator
);
