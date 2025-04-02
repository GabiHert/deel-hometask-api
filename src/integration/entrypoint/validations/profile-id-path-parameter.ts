import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  profileId: joi.number().required(),
});
const profileIdValidator = new JoiValidator(schema, "Invalid path parameters");

export const profileIdPathParameterValidation =
  profileIdValidator.validate.bind(profileIdValidator);
