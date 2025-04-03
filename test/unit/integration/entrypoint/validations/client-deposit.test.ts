import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { ClientDepositValidator } from "../../../../../src/integration/entrypoint/validations/client-deposit";

describe("ClientDepositValidator", () => {
  let validator: ClientDepositValidator;

  beforeEach(() => {
    validator = new ClientDepositValidator();
  });

  it("should throw an error when amount is below 1", async () => {
    const invalidInput = {
      amount: 0,
    };

    try {
      await validator.validate(invalidInput);
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

  it("should throw an error when amount is not a number", async () => {
    const invalidInput = {
      amount: "invalid",
    };

    try {
      await validator.validate(invalidInput);
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

  it("should throw an error when amount is missing", async () => {
    const invalidInput = {};

    try {
      await validator.validate(invalidInput);
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

  it("should throw an error when input contains unexpected fields", async () => {
    const invalidInput = {
      amount: 10,
      extraField: "unexpected",
    };

    try {
      await validator.validate(invalidInput);
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
