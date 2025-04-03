import { BadRequest } from "../../../../../src/integration/entrypoint/errors/bad-request";
import { ProfileIdPathParameterValidator } from "../../../../../src/integration/entrypoint/validations/profile-id-path-parameter";

describe("await new ProfileIdPathParameterValidator().validate", () => {
  it("should throw an error when profileId is below 0", async () => {
    const invalidInput = {
      profileId: -1,
    };
    try {
      await new ProfileIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when profileId is missing", async () => {
    const invalidInput = {};
    try {
      await new ProfileIdPathParameterValidator().validate(invalidInput);
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

  it("should throw an error when profileId is not a number", async () => {
    const invalidInput = {
      profileId: "invalid",
    };
    try {
      await new ProfileIdPathParameterValidator().validate(invalidInput);
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

  it("should validate successfully when profileId is valid", async () => {
    const validInput = {
      profileId: 1,
    };
    expect(
      new ProfileIdPathParameterValidator().validate(validInput)
    ).resolves.not.toThrow();
  });
});
