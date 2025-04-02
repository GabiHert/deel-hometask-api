import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { jobIdPathParameterValidation } from "../../../../../src/integration/entrypoint/validations/job-id-path-parameter";

describe("jobIdPathParameterValidation", () => {
  it("should throw an error when jobId is null", () => {
    const invalidInput = { jobId: null };
    try {
      jobIdPathParameterValidation(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "jobId",
          message: '"jobId" must be a number',
        },
      ]);
    }
  });

  it("should throw an error when jobId is missing", () => {
    const invalidInput = {};
    try {
      jobIdPathParameterValidation(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "jobId",
          message: '"jobId" is required',
        },
      ]);
    }
  });

  it("should throw an error when jobId is not a number", () => {
    const invalidInput = { jobId: "abc" };
    try {
      jobIdPathParameterValidation(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "jobId",
          message: '"jobId" must be a number',
        },
      ]);
    }
  });

  it("should throw an error when jobId is less than or equal to 0", () => {
    const invalidInput = { jobId: 0 };
    try {
      jobIdPathParameterValidation(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "jobId",
          message: '"jobId" must be greater than 0',
        },
      ]);
    }
  });

  it("should validate successfully when jobId is valid", () => {
    const validInput = { jobId: 123 };
    expect(() => jobIdPathParameterValidation(validInput)).not.toThrow();
  });
});
