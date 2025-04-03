import { Response } from "express";
import { ProfileRequest } from "../../../infra/server/request";
import { MiddlewareAdapter } from "../../adapters/middleware";

export class QueryParametersValidator {
  private constructor() {}
  public static create(
    validator: (queryParameters: any) => Promise<void>
  ): MiddlewareAdapter {
    return async (
      req: ProfileRequest,
      _res: Response,
      next: Function
    ): Promise<void> => {
      try {
        const { query } = req;
        await validator(query);
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
