import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { profileIdPathParameterValidation } from "../../../../../src/integration/entrypoint/validations/profile-id-path-parameter";

describe("profileIdPathParameterValidation", () => {
  it("should throw an error when profileId is below 0", () => {
    const invalidInput = {
      profileId: -1,
    };
    try {
      profileIdPathParameterValidation(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "profileId",
          message: '"profileId" must be greater than 0',
        },
      ]);
    }
  });

  it("should throw an error when profileId is missing", () => {
    const invalidInput = {};
    try {
      profileIdPathParameterValidation(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "profileId",
          message: '"profileId" is required',
        },
      ]);
    }
  });

  it("should throw an error when profileId is not a number", () => {
    const invalidInput = {
      profileId: "invalid",
    };
    try {
      profileIdPathParameterValidation(invalidInput);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      const parsedError = error as BadRequest;
      expect(parsedError.message).toBe("Invalid path parameters");
      expect(parsedError.errorDetails).toEqual([
        {
          field: "profileId",
          message: '"profileId" must be a number',
        },
      ]);
    }
  });

  it("should validate successfully when profileId is valid", () => {
    const validInput = {
      profileId: 1,
    };
    expect(() => profileIdPathParameterValidation(validInput)).not.toThrow();
  });
});
