import { Response } from "express";
import { ProfileRequest } from "../../../infra/server/request";
import { MiddlewareAdapter } from "../../adapters/middleware";

export class PathParametersValidation implements MiddlewareAdapter {
  constructor(
    private readonly validator: (queryParameters: any) => Promise<void>
  ) {}
  async handle(
    req: ProfileRequest,
    _res: Response,
    next: Function
  ): Promise<void> {
    const pathParameters = req.params;
    await this.validator(pathParameters);
    next();
  }
}
