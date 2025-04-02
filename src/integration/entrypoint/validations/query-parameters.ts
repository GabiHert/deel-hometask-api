import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  start: joi.date(),
  end: joi.date().greater(joi.ref('start')),
  page: joi.number().greater(0),
  limit: joi.number().greater(0),
});

const queryParametersValidator = new JoiValidator(schema, "Invalid query parameters");

export const queryParametersValidation =
  queryParametersValidator.validate.bind(queryParametersValidator);
