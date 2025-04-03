import { NextFunction, Response } from "express";
import { ProfileRequest } from "../../infra/server/request";

export type MiddlewareAdapter =
  | ((
      req: ProfileRequest,
      res: Response,
      next: NextFunction
    ) => Promise<void> | void)
  | ((
      err: Error,
      req: ProfileRequest,
      res: Response,
      next: NextFunction
    ) => void);
