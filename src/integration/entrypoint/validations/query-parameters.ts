import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  start: joi.date(),
  end: joi.date(),
  page: joi.number(),
  limit: joi.number(),
});

export const validatePathParameters = new JoiValidator(
  schema,
  "Invalid query parameters"
).validate;
