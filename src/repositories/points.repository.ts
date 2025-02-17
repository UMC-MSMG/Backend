import { prisma } from "../db.config";

export const PointsRepository = {
  // 사용자 포인트 조회 api
  getUserPoint: async (userId: number) => {
    const userPoint = await prisma.user.findFirstOrThrow({
      where: { id: userId },
      select: { point: true },
    });
    return userPoint.point;
  },
  //사용자 포인트 더하는 api
  addUserPoint: async (userId: number, points: number) => {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { point: { increment: points } },
    });
    return user.point;
  },
  //물건 구매 해서 Purchase에 구매 기록 넣기, 유저 포인트 차감
  buyProduct: async (userId: number, productId: number) => {
    const getPrice = await prisma.product.findUnique({
      where: { id: productId },
      select: { price: true },
    });
    console.log(getPrice?.price);
    const productPrice = getPrice?.price;
    await prisma.$transaction([
      prisma.purchase.create({
        data: { userId, productId },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { point: { decrement: productPrice } },
      }),
    ]);
    return;
  },
  getProductPrice: async (productId: number) => {
    const getPrice = await prisma.product.findUnique({
      where: { id: productId },
      select: { price: true },
    });
    if (!getPrice?.price) {
      throw new Error("존재하지 않는 상품입니다");
    } else {
      return getPrice.price;
    }
  },
};

// export const useUserPoints = async (
//   userId: number,
//   points: number
// ) => {
//   const user = await prisma.user.update({
//     where: { id: userId },
//     data: { points: { decrement: points } },
//   });
//   return user.points;
// };
