import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  jobId: joi.number().greater(0).required(),
});

const jobIdValidator = new JoiValidator(schema, "Invalid path parameters");

export const jobIdPathParameterValidation =
  jobIdValidator.validate.bind(jobIdValidator);
