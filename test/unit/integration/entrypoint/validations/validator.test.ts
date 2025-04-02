import Joi from "joi";
import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { JoiValidator } from "../../../../../src/integration/entrypoint/validations/validator";

describe("JoiValidator", () => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
  });
  const errorMessage = "Validation failed";

  let validator: JoiValidator;

  beforeEach(() => {
    validator = new JoiValidator(schema, errorMessage);
  });

  it("should validate successfully when input is valid", () => {
    const input = { name: "John Doe", age: 30 };

    expect(() => validator.validate(input)).not.toThrow();
  });

  it("should throw BadRequest when input is invalid", () => {
    const input = { name: "John Doe" }; // Missing age

    expect(() => validator.validate(input)).toThrow(BadRequest);
    try {
      validator.validate(input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const errorParsed = error as BadRequest;
      expect(errorParsed.message).toBe(errorMessage);
      expect((errorParsed as BadRequest).errorDetails).toEqual([
        { field: "age", message: '"age" is required' },
      ]);
    }
  });

  it("should throw BadRequest with multiple error details when input has multiple issues", () => {
    const input = { name: "", age: -5 }; // Invalid name and age

    expect(() => validator.validate(input)).toThrow(BadRequest);
    try {
      validator.validate(input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const errorParsed = error as BadRequest;
      expect(errorParsed.message).toBe(errorMessage);
      expect((errorParsed as BadRequest).errorDetails).toEqual([
        { field: "name", message: '"name" is not allowed to be empty' },
        { field: "age", message: '"age" must be greater than or equal to 0' },
      ]);
    }
  });

  it("should handle empty input gracefully", () => {
    const input = {};

    expect(() => validator.validate(input)).toThrow(BadRequest);
    try {
      validator.validate(input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const errorParsed = error as BadRequest;
      expect(errorParsed.message).toBe(errorMessage);
      expect((errorParsed as BadRequest).errorDetails).toEqual([
        { field: "name", message: '"name" is required' },
        { field: "age", message: '"age" is required' },
      ]);
    }
  });

  it("should handle null input gracefully", () => {
    const input = null;

    expect(() => validator.validate(input)).toThrow(BadRequest);
    try {
      validator.validate(input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const errorParsed = error as BadRequest;
      expect(errorParsed.message).toBe(errorMessage);
      expect((errorParsed as BadRequest).errorDetails).toEqual([
        { field: "", message: '"value" must be of type object' },
      ]);
    }
  });
});
