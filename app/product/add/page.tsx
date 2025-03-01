// 관리자 전용 : 상품 추가
import ProductAddForm from '@/components/Product/ProductAddForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '상품 추가 페이지 | Computer-Shop',
  description: '관리자 전용 - 상품 추가 페이지',
};

export default function page() {
  return (
    <>
      <ProductAddForm />
    </>
  );
}
