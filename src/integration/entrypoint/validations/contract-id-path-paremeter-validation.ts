import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  contractId: joi.number().required(),
});

export const contractIdPathParameterValidation = new JoiValidator(
  schema,
  "Invalid path parameters"
).validate;
