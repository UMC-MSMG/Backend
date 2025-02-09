import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Access Token 생성 (1시간 유효)
export const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

// Refresh Token 생성 (30일 유효)
export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET as string, {
    expiresIn: "30d",
  });
};

// // JWT 검증 함수
// export const verifyToken = (token: string) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET as string);
//   } catch (error) {
//     return null;
//   }
// };
