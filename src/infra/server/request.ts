import { Request } from "express";

export interface ProfileRequest extends Request {
  profileId?: number;
}
