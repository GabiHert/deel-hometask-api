import { Response } from "express";
import { ProfileRequest } from "../../../infra/server/request";
import { MiddlewareAdapter } from "../../adapters/middleware";

export class PathParametersValidationMiddleware {
  private constructor() {}
  public static create(
    validator: (queryParameters: any) => Promise<void>
  ): MiddlewareAdapter {
    return async (
      req: ProfileRequest,
      _res: Response,
      next: Function
    ): Promise<void> => {
      const pathParameters = req.params;
      await validator(pathParameters);
      next();
    };
  }
}
