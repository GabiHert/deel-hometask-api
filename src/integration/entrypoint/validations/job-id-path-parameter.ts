import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  jobId: joi.number().required(),
});

export const jobIdPathParameterValidation = new JoiValidator(
  schema,
  "Invalid path parameters"
).validate;
