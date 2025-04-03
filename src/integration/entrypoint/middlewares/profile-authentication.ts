import { Response } from "express";
import { ProfileNotFoundError } from "../../../domain/errors/profile-not-found";
import { ProfileRequest } from "../../../infra/server/request";
import { MiddlewareAdapter } from "../../adapters/middleware";
import { ProfileRepositoryAdapter } from "../../adapters/profile-repository";
import { UnauthorizedError } from "../errors/unauthorized";

export class ProfileAuthenticationMiddleware {
  constructor(private readonly profileRepository: ProfileRepositoryAdapter) {}
  private validateProfileId(profileId: string | undefined): number {
    if (!profileId) {
      throw new UnauthorizedError("profile_id is required");
    }
    const id = parseInt(profileId, 10);
    if (isNaN(id) || id <= 0) {
      throw new UnauthorizedError("invalid profile_id");
    }
    return id;
  }
  create(): MiddlewareAdapter {
    return async (
      req: ProfileRequest,
      _res: Response,
      next: Function
    ): Promise<void> => {
      try {
        const profileId = this.validateProfileId(req.get("profile_id"));
        await this.profileRepository.findProfileById(profileId);
      } catch (err) {
        if (err instanceof ProfileNotFoundError) {
          return next(new UnauthorizedError("invalid profile_id"));
        }
        return next(err);
      }
      next();
    };
  }
}
