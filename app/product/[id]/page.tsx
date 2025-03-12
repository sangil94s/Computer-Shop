// 상품 관련 상세 페이지가 될 부분
import ProductDetailAddButton from '@/components/Product/Detil/ProductDetailAddButton';
import ProductDetailCard from '@/components/Product/ProductDetailCard';
import ProductDetailImage from '@/components/Product/Detil/ProductDetailImage';
import ProductDetailMainImage from '@/components/Product/Detil/ProductDetailMainImage';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '상품 상세 페이지 | Computer-Shop',
  description: '수정 예정',
};

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <>
      <div className="grid grid-cols-2">
        <ProductDetailMainImage id={id} />
        <ProductDetailCard id={id} />
      </div>
      <ProductDetailImage id={id} />
      <ProductDetailAddButton id={id} />
    </>
  );
}
