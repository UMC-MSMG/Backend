export interface Gifticon {
    id: number;
    name: string;
    price: number;
    image?: string;
    //store: string;
    //isUsed: boolean;
  }
  
  export interface GetUserGifticonsResponse {
    userId: number;
    gifticons: Gifticon[];
    message: string;
  }
  
  export interface GetAllGifticonsResponse {
    products: Gifticon[];
    message: string;
  }
  