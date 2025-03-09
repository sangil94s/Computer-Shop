import ProductDetailAddForm from '@/components/Product/Detil/ProductDetailAddForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '상품 상세 이미지 페이지 | Computer-Shop',
  description: '수정 예정',
};

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <>
      <ProductDetailAddForm id={id} />
    </>
  );
}
