import { Request, Response } from "express";
import { MiddlewareAdapter } from "../../adapters/middleware";

export class QueryParametersValidator implements MiddlewareAdapter {
  constructor(
    private readonly validator: (queryParameters: any) => Promise<void>
  ) {}
  async handle(req: Request, _res: Response, next: Function): Promise<void> {
    try {
      const { query } = req;
      await this.validator(query);
      next();
    } catch (error) {
      next(error);
    }
  }
}
