import { JwtPayload } from "jsonwebtoken";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: number }; // `id`를 number로 설정하여 undefined 방지
    }
  }
}
