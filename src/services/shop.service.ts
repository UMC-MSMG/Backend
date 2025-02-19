import { ShopRepository } from "../repositories/shop.repository";

export const ShopService = {
  /**
   * 사용자의 기프티콘 목록 조회
   */
  getUserGifticons: async (userId: number) => {
    return await ShopRepository.getUserGifticons(userId);
  },

  /**
   * 전체 기프티콘 조회 (사용자가 구매할 수 있는 목록)
   */
  getAllGifticons: async () => {
    return await ShopRepository.getAllGifticons();
  },
};
