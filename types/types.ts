// 프로젝트 전체 interface나 type를 여기에 작성하고 필요한 컴포넌트에서 Import 합니다.

export interface FAQAddTypes {
  category: string;
  title: string;
  description: string;
} // VOC ADD 와 FAQ ADD 같이 사용 = 둘이 들어가는 값이 같음.

export interface FAQListTypes {
  id: number;
  category: string;
  title: string;
  description: string;
  createDate: string;
} // VOC List와 FAQ List 같이 사용

export interface CloudinaryResult {
  public_id: string;
} // 클라우디너리 관련

export interface ProductAddFormTypes {
  category: string;
  title: string;
  price: number;
  smallDescription: string;
  productImage: string;
  purchase?: boolean;
} // 상품 추가 시 사용

export interface ProductCardTypes extends ProductAddFormTypes {
  id: number;
  createDate: string;
}

export interface PostPageTypes {
  params: { id: string };
}
