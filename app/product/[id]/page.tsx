// 상품 관련 상세 페이지가 될 부분
import ProductDetailCard from '@/components/Product/ProductDetailCard';
import ProductDetailImage from '@/components/Product/ProductDetailImage';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '상품 상세 페이지 | Computer-Shop',
  description: '수정 예정',
};

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <>
      <ProductDetailCard id={id} />
      <ProductDetailImage />
    </>
  );
}
