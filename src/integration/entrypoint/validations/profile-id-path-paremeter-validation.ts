import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  profileId: joi.number().required(),
});

export const contractIdPathParameterValidation = new JoiValidator(
  schema,
  "Invalid path parameters"
).validate;
