import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { QueryParametersValidator } from "../../../../../src/integration/entrypoint/validations/query-parameters";

describe("queryParametersValidation", () => {
  it("should throw an error when 'start' is not a valid date", async () => {
    const invalidInput = {
      start: "invalid-date",
      end: "2023-01-01",
      page: 1,
      limit: 10,
    };
    try {
      await new QueryParametersValidator().validate(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid query parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "start",
          message: '"start" must be in iso format',
        },
      ]);
    }
  });

  it("should throw an error when 'end' is before 'start'", async () => {
    const invalidInput = {
      start: "2023-01-02",
      end: "2023-01-01",
      page: 1,
      limit: 10,
    };
    try {
      await new QueryParametersValidator().validate(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid query parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "end",
          message: '"end" must be greater than "start"',
        },
      ]);
    }
  });

  it("should throw an error when 'page' is less than or equal to 0", async () => {
    const invalidInput = {
      start: "2023-01-01",
      end: "2023-01-02",
      page: 0,
      limit: 10,
    };
    try {
      await new QueryParametersValidator().validate(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid query parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "page",
          message: '"page" must be greater than 0',
        },
      ]);
    }
  });

  it("should throw an error when 'limit' is less than or equal to 0", async () => {
    const invalidInput = {
      start: "2023-01-01",
      end: "2023-01-02",
      page: 1,
      limit: 0,
    };
    try {
      await new QueryParametersValidator().validate(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid query parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "limit",
          message: '"limit" must be greater than 0',
        },
      ]);
    }
  });

  it("should validate successfully when all parameters are valid", async () => {
    const validInput = {
      start: "2023-01-01",
      end: "2023-01-02",
      page: 1,
      limit: 10,
    };
    expect(
      new QueryParametersValidator().validate(validInput)
    ).resolves.not.toThrow();
  });
});
