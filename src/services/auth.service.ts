import { KakaoLoginResponseDto } from "../dtos/auth.dto";
import coolsms from "coolsms-node-sdk";
import {
  AuthRepository,
  updateRefreshToken,
} from "../repositories/auth.repository";
import dotenv from "dotenv";
import { VerificationData } from "../types/auth.types";
import { generateAccessToken, generateRefreshToken } from "../jwt";

dotenv.config();

export class AuthService {
  static async processKakaoLogin(user: any): Promise<KakaoLoginResponseDto> {
    try {
      if (!user) {
        throw new Error("카카오 로그인 실패");
      }
      console.log("카카오 유저", user);
      console.log("id: ", user.user.id);

      return {
        message: "카카오 로그인 성공",
        user: {
          id: user.user.id,
          name: user.user.name,
          image: user.user.image,
        },
        newUser: user.newUser,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      };
    } catch (error) {
      console.error("카카오 로그인 처리 중 오류 발생:", error);
      throw new Error("카카오 로그인 실패");
    }
  }
}

// @ts-ignore
const mysms = coolsms.default;

const messageService = new mysms(
  process.env.SMS_API_KEY as string,
  process.env.SMS_API_SECRET as string
);

//랜덤 숫자 6자리 생성 함수
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//인증 코드 객체 생성
const verificationCode = new Map<string, VerificationData>();

//export 함수
export const VerificationService = {
  //인증 코드 전송 함수
  sendCode: async (phoneNum: string) => {
    const code = generateVerificationCode();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    //기존 존재하는 인증 번호 삭제
    if (verificationCode.has(phoneNum)) {
      clearTimeout(verificationCode.get(phoneNum)!.timeoutId); // 기존 타이머 제거
      verificationCode.delete(phoneNum);
    }

    // 5분후 메모리에서 자동 삭제하는 코드
    const timeoutId = setTimeout(
      () => {
        verificationCode.delete(phoneNum);
        console.log(`⏳ ${phoneNum}의 인증 코드가 자동 삭제되었습니다.`);
      },
      5 * 60 * 1000
    ); //5분

    verificationCode.set(phoneNum, { code, expiresAt, timeoutId });

    try {
      const response = await messageService.sendOne({
        to: phoneNum,
        from: process.env.PHONE as string,
        text: `[만수무강] 인증번호: ${code}`,
        autoTypeDetect: true,
      });
      console.log(`📩 ${phoneNum}로 인증번호 전송: ${code}`, response);
      return { success: true, message: "인증번호가 전송되었습니다." };
    } catch (error) {}
  },
  //
  verifyLoginCode: async (phoneNum: string, code: string) => {
    const storedData = verificationCode.get(phoneNum);
    // @ts-ignore
    console.log(
      Array.from(verificationCode.entries()).map(([phoneNum, data]) => ({
        phoneNum,
        ...data,
      }))
    );

    if (!storedData) {
      return { success: false, message: "인증번호가 존재하지 않습니다." };
    }
    const { code: storedCode, expiresAt, timeoutId } = storedData;
    if (Date.now() > expiresAt) {
      verificationCode.delete(phoneNum);
      clearTimeout(timeoutId); // 타이머 제거
      return {
        success: false,
        message: "인증번호가 만료되었습니다. 다시 요청하세요.",
      };
    }
    if (storedCode !== code) {
      return { success: false, message: "인증번호가 올바르지 않습니다." }; // 🚀 여기서 throw 대신 객체 반환
    }
    verificationCode.delete(phoneNum);
    clearTimeout(timeoutId);
    const user = await AuthRepository.findPhoneNum(phoneNum);
    return {
      success: true,
      message: "인증이 완료되었습니다.",
      userId: user?.id,
    };
  },
  //회원가입 인증
  verifySignupCode: async (phoneNum: string, code: string) => {
    const storedData = verificationCode.get(phoneNum);
    // @ts-ignore
    console.log(
      Array.from(verificationCode.entries()).map(([phoneNum, data]) => ({
        phoneNum,
        ...data,
      }))
    );

    if (!storedData) {
      throw { statusCode: 400, message: "인증번호가 존재하지 않습니다.." };
    }
    const { code: storedCode, expiresAt, timeoutId } = storedData;
    if (Date.now() > expiresAt) {
      verificationCode.delete(phoneNum);
      clearTimeout(timeoutId); // 타이머 제거
      throw { statusCode: 400, message: "인증번호가 만료되었습니다." };
    }
    if (storedCode !== code) {
      throw { statusCode: 400, message: "인증번호가 올바르지 않습니다." };
    }
    verificationCode.delete(phoneNum);
    clearTimeout(timeoutId);
    const userId = await AuthRepository.createUserByPhone(phoneNum);
    if (!userId) {
      throw { statusCode: 500, message: "서버 에러" };
    }
    return {
      userId,
    };
  },
  // 존재하는 전화번호인지 확인하기
  isPhoneNum: async (phoneNum: string) => {
    const user = await AuthRepository.findPhoneNum(phoneNum);
    if (!user) {
      return false;
    } else {
      return true;
    }
  },
  handleToken: async (userId: number) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    console.log("서비스 유저 아이디", userId);
    await updateRefreshToken(userId, refreshToken);
    return { user_id: userId, accessToken, refreshToken };
  },
  test: async (phoneNum: string) => {
    console.log("여기기기기ㅣ");
    return await AuthRepository.createUserByPhone(phoneNum);
  },
};
