import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { ClientDepositBodyValidator } from "../../../../../src/integration/entrypoint/validations/client-deposit";

describe("ClientDepositValidator", () => {
  let validator: ClientDepositBodyValidator;

  beforeEach(() => {
    validator = new ClientDepositBodyValidator();
  });

  it("should throw an error when amount is below 1", () => {
    const invalidInput = {
      amount: 0,
    };

    try {
      validator.validationStrategy(null, invalidInput, null);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid input body");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "amount",
          message: '"amount" must be greater than 1',
        },
      ]);
    }
  });

  it("should throw an error when amount is not a number", () => {
    const invalidInput = {
      amount: "invalid",
    };

    try {
      validator.validationStrategy(null, invalidInput, null);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid input body");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "amount",
          message: '"amount" must be a number',
        },
      ]);
    }
  });

  it("should throw an error when amount is missing", () => {
    const invalidInput = {};

    try {
      validator.validationStrategy(null, invalidInput, null);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid input body");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "amount",
          message: '"amount" is required',
        },
      ]);
    }
  });

  it("should throw an error when input contains unexpected fields", () => {
    const invalidInput = {
      amount: 10,
      extraField: "unexpected",
    };

    try {
      validator.validationStrategy(null, invalidInput, null);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid input body");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "extraField",
          message: '"extraField" is not allowed',
        },
      ]);
    }
  });
});
