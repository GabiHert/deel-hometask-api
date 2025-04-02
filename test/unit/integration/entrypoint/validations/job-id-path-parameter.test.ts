import joi from "joi";
import { JoiValidator } from "./validator.test";

const schema = joi.object({
  jobId: joi.number().required(),
});

export const jobIdPathParameterValidation = new JoiValidator(
  schema,
  "Invalid path parameters"
).validate;
