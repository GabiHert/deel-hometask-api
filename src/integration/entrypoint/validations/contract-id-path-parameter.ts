import joi from "joi";
import { JoiValidator } from "./validator";

const schema = joi.object({
  contractId: joi.number().greater(0).required(),
});

const contractIdValidator = new JoiValidator(schema, "Invalid path parameters");

export const contractIdPathParameterValidation =
  contractIdValidator.validate.bind(contractIdValidator);
