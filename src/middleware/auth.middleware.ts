import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "인증 토큰이 필요합니다." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { id?: string };

    if (!decoded.id) {
      res
        .status(403)
        .json({ message: "유효한 사용자 정보가 포함되지 않은 토큰입니다." });
      return;
    }
    // ✅ id가 string이라면 number로 변환
    req.user = {
      ...decoded,
      id:
        typeof decoded.id === "string" ? parseInt(decoded.id, 10) : decoded.id,
    } as JwtPayload & { id: number }; // id를 number로 보장

    return next();
  } catch (error) {
    res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    return;
  }
};
