export interface KakaoLoginResponseDto {
  message: string;
  user: {
    id: number;
    name: string;
    image: string | null;
  };
  accessToken: string;
  refreshToken: string;
}
