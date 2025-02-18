export interface KakaoLoginResponseDto {
  message: string;
  newUser: boolean;
  user: {
    id: number;
    name: string;
    image: string | null;
  };
  accessToken: string;
  refreshToken: string;
}
