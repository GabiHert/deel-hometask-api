import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { JobIdPathParameterValidator } from "../../../../../src/integration/entrypoint/validations/job-id-path-parameter";

describe("JobIdPathParameterValidator", () => {
  it("should throw an error when jobId is null", async () => {
    const invalidInput = { jobId: null };
    try {
      await new JobIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when jobId is missing", async () => {
    const invalidInput = {};
    try {
      await new JobIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when jobId is not a number", async () => {
    const invalidInput = { jobId: "abc" };
    try {
      await new JobIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when jobId is less than or equal to 0", async () => {
    const invalidInput = { jobId: 0 };
    try {
      await new JobIdPathParameterValidator().validate(invalidInput);
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

  it("should validate successfully when jobId is valid", async () => {
    const validInput = { jobId: 123 };
    expect(
      new JobIdPathParameterValidator().validate(validInput)
    ).resolves.not.toThrow();
  });
});
