import joi from "joi";
import { JoiValidator } from "./validator.test";

const schema = joi.object({
  start: joi.date(),
  end: joi.date().greater(joi.ref("start")),
  page: joi.number().greater(0),
  limit: joi.number().greater(0),
});

export const queryParametersValidation = new JoiValidator(
  schema,
  "Invalid query parameters"
).validate;
