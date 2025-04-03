import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { ContractIdPathParameterValidator } from "../../../../../src/integration/entrypoint/validations/contract-id-path-parameter";

describe("ContractIdPathParameterValidator", () => {
  it("should validate successfully when contractId is a valid number", async () => {
    const validInput = { contractId: 123 };
    await expect(
      new ContractIdPathParameterValidator().validate(validInput)
    ).resolves.not.toThrow();
  });

  it("should throw an error when contractId is below 0", async () => {
    const invalidInput = {
      contractId: -1,
    };

    try {
      await new ContractIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when contractId is zero", async () => {
    const invalidInput = { contractId: 0 };
    try {
      await new ContractIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when contractId is a decimal number", async () => {
    const invalidInput = { contractId: 123.45 };
    try {
      await new ContractIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when contractId is undefined", async () => {
    const invalidInput = { contractId: undefined };
    try {
      await new ContractIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when contractId is an empty string", async () => {
    const invalidInput = { contractId: "" };
    try {
      await new ContractIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when contractId is null", async () => {
    const invalidInput = { contractId: null };
    try {
      await new ContractIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when contractId is missing", async () => {
    const invalidInput = {};
    try {
      await new ContractIdPathParameterValidator().validate(invalidInput);
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
