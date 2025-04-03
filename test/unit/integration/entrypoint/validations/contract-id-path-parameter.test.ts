import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { ContractIdPathParameterValidator } from "../../../../../src/integration/entrypoint/validations/contract-id-path-parameter";

describe("ContractIdPathParameterValidator", () => {
  it("should validate successfully when contractId is a valid number", () => {
    const validInput = { contractId: 123 };
    try {
      new ContractIdPathParameterValidator().validationStrategy(
        validInput,
        null,
        null
      );
    } catch (err) {
      expect(err).toBeNull();
    }
  });

  it("should throw an error when contractId is below 0", () => {
    const invalidInput = {
      contractId: -1,
    };

    try {
      new ContractIdPathParameterValidator().validationStrategy(
        invalidInput,
        null,
        null
      );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "contractId",
          message: '"contractId" must be greater than 0',
        },
      ]);
    }
  });

  it("should throw an error when contractId is zero", () => {
    const invalidInput = { contractId: 0 };
    try {
      new ContractIdPathParameterValidator().validationStrategy(
        invalidInput,
        null,
        null
      );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "contractId",
          message: '"contractId" must be greater than 0',
        },
      ]);
    }
  });

  it("should throw an error when contractId is a decimal number", () => {
    const invalidInput = { contractId: 123.45 };
    try {
      new ContractIdPathParameterValidator().validationStrategy(
        invalidInput,
        null,
        null
      );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "contractId",
          message: '"contractId" must be an integer',
        },
      ]);
    }
  });

  it("should throw an error when contractId is undefined", () => {
    const invalidInput = { contractId: undefined };
    try {
      new ContractIdPathParameterValidator().validationStrategy(
        null,
        invalidInput,
        null
      );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "contractId",
          message: '"contractId" is required',
        },
      ]);
    }
  });

  it("should throw an error when contractId is an empty string", () => {
    const invalidInput = { contractId: "" };
    try {
      new ContractIdPathParameterValidator().validationStrategy(
        invalidInput,
        null,
        null
      );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "contractId",
          message: '"contractId" must be a number',
        },
      ]);
    }
  });

  it("should throw an error when contractId is null", () => {
    const invalidInput = { contractId: null };
    try {
      new ContractIdPathParameterValidator().validationStrategy(
        invalidInput,
        null,
        null
      );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "contractId",
          message: '"contractId" must be a number',
        },
      ]);
    }
  });

  it("should throw an error when contractId is missing", () => {
    const invalidInput = {};
    try {
      new ContractIdPathParameterValidator().validationStrategy(
        invalidInput,
        null,
        null
      );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "contractId",
          message: '"contractId" is required',
        },
      ]);
    }
  });
});
