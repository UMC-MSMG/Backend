import { prisma } from "../db.config";

export const ShopRepository = {
  /**
   * 특정 사용자가 구매한 기프티콘 목록 조회
   */
  getUserGifticons: async (userId: number) => {
    return await prisma.purchase.findMany({
      where: { userId },
      include: {
        Product: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
          },
        },
      },
    }).then(purchases =>
      purchases.map(purchase => ({
        id: purchase.Product.id,
        name: purchase.Product.name,
        price: purchase.Product.price,
        image: purchase.Product.image,
        store: "GS25", // 예시로 GS25, 실제로는 store 정보를 추가해야 함.
        isUsed: false, // isUsed 필드가 없어서 기본값 false 처리
      }))
    );
  },

  /**
   * 전체 기프티콘 조회
   */
  getAllGifticons: async () => {
    return await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    }).then(products =>
      products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        store: "GS25", // 예시로 GS25, 실제로는 store 정보를 추가해야 함.
      }))
    );
  },
};
