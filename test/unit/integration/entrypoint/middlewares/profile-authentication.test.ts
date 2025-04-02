import { Response } from "express";
import { ProfileEntity } from "../../../../../src/domain/entities/profile";
import { ProfileNotFoundError } from "../../../../../src/domain/errors/profile-not-found";
import { ProfileRequest } from "../../../../../src/infra/server/request";
import { ProfileRepository } from "../../../../../src/integration/adapters/profile-repository";
import { UnauthorizedError } from "../../../../../src/integration/entrypoint/errors/unauthorized";
import { ProfileAuthentication } from "../../../../../src/integration/entrypoint/middlewares/profile-authentication";

describe("ProfileAuthentication Middleware", () => {
  let profileRepositoryMock: jest.Mocked<ProfileRepository>;
  let profileAuthentication: ProfileAuthentication;
  let nextMock: jest.Mock;

  beforeEach(() => {
    profileRepositoryMock = {
      findProfileById: jest.fn(),
    } as unknown as jest.Mocked<ProfileRepository>;
    profileAuthentication = new ProfileAuthentication(profileRepositoryMock);
    nextMock = jest.fn();
  });

  it("should throw UnauthorizedError when profile_id is missing", async () => {
    const reqMock = {
      get: jest.fn().mockReturnValue(undefined),
    } as unknown as ProfileRequest;

    await profileAuthentication.handle(reqMock, {} as Response, nextMock);

    expect(nextMock).toHaveBeenCalledWith(
      new UnauthorizedError("profile_id is required")
    );
  });

  it("should throw UnauthorizedError when profile_id is not a valid number", async () => {
    const reqMock = {
      get: jest.fn().mockReturnValue("abc"),
    } as unknown as ProfileRequest;

    await profileAuthentication.handle(reqMock, {} as Response, nextMock);

    expect(nextMock).toHaveBeenCalledWith(
      new UnauthorizedError("invalid profile_id")
    );
  });

  it("should throw UnauthorizedError when profile_id is less than or equal to 0", async () => {
    const reqMock = {
      get: jest.fn().mockReturnValue("0"),
    } as unknown as ProfileRequest;

    await profileAuthentication.handle(reqMock, {} as Response, nextMock);

    expect(nextMock).toHaveBeenCalledWith(
      new UnauthorizedError("invalid profile_id")
    );
  });

  it("should throw UnauthorizedError when profile is not found", async () => {
    const reqMock = {
      get: jest.fn().mockReturnValue("123"),
    } as unknown as ProfileRequest;

    profileRepositoryMock.findProfileById.mockRejectedValue(
      new ProfileNotFoundError("profile with id '123' not found")
    );

    await profileAuthentication.handle(reqMock, {} as Response, nextMock);

    expect(nextMock).toHaveBeenCalledWith(
      new UnauthorizedError("invalid profile_id")
    );
  });

  it("should call next without error when profile_id is valid and profile exists", async () => {
    const reqMock = {
      get: jest.fn().mockReturnValue("123"),
    } as unknown as ProfileRequest;

    profileRepositoryMock.findProfileById.mockResolvedValue({
      id: 123,
    } as ProfileEntity);

    await profileAuthentication.handle(reqMock, {} as Response, nextMock);

    expect(nextMock).toHaveBeenCalledWith();
  });

  it("should propagate unexpected errors to next", async () => {
    const reqMock = {
      get: jest.fn().mockReturnValue("123"),
    } as unknown as ProfileRequest;

    const unexpectedError = new Error("Unexpected error");
    profileRepositoryMock.findProfileById.mockRejectedValue(unexpectedError);

    await profileAuthentication.handle(reqMock, {} as Response, nextMock);

    expect(nextMock).toHaveBeenCalledWith(unexpectedError);
  });
});
