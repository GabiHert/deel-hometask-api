import { Response } from "express";
import { ProfileNotFoundError } from "../../../domain/errors/profile-not-found";
import { ProfileRequest } from "../../../infra/server/request";
import { MiddlewareAdapter } from "../../adapters/middleware";
import { ProfileRepository } from "../../adapters/profile-repository";
import { UnauthorizedError } from "../errors/unauthorized";

export class ProfileAuthentication implements MiddlewareAdapter {
  constructor(private readonly profileRepository: ProfileRepository) {}
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
  async handle(
    req: ProfileRequest,
    _res: Response,
    next: Function
  ): Promise<void> {
    try {
      const profileId = this.validateProfileId(req.get("profile_id"));
      await this.profileRepository.findProfileById(profileId).catch((err) => {
        if (err instanceof ProfileNotFoundError) {
          throw new UnauthorizedError("invalid profile_id");
        }
        throw err;
      });

      next();
    } catch (error) {
      next(error);
    }
  }
}
