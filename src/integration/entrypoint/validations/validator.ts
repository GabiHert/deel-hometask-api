import { NextFunction, Response } from "express";
import Joi from "joi";
import { ErrorDetail } from "../../../domain/errors/application-base-error";
import { ProfileRequest } from "../../../infra/server/request";
import { MiddlewareAdapter } from "../../adapters/middleware";
import { BadRequest } from "../errors/bad-request";

export abstract class JoiValidator {
  constructor(private readonly errorMessage: string) {
    this.validate = this.validate.bind(this);
  }

  protected abstract validationStrategy(
    path?: any,
    _body?: any,
    _query?: any
  ): Joi.ValidationResult;

  validate: MiddlewareAdapter = async (
    req: ProfileRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { error } = this.validationStrategy(
        req.params,
        req.body,
        req.query
      );
      if (error) {
        const errorDetails: ErrorDetail[] = error.details.map(
          (detail: any) => ({
            field: detail.path.join("."),
            message: detail.message,
          })
        );
        throw new BadRequest(this.errorMessage, errorDetails);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
