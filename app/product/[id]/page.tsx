// 상품 관련 상세 페이지가 될 부분
import ProductDetailAddButton from '@/components/Product/Detil/ProductDetailAddButton';
import ProductDetailCard from '@/components/Product/ProductDetailCard';
import ProductDetailImage from '@/components/Product/Detil/ProductDetailImage';
import ProductDetailMainImage from '@/components/Product/Detil/ProductDetailMainImage';
import { Metadata } from 'next';

type Params = Promise<{ id: string }>;
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }
  const data = await res.json();

  return {
    title: `${data.title} | Computer-Shop`,
    description: data.description || '상품 상세 페이지입니다.',
  };
}

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
