// 아마도 장바구니 페이지
import CartInfomation from '@/components/Cart/CartInfomation';
import CartTable from '@/components/Cart/CartTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart | Computer-Shop',
  description: '장바구니',
};
export default async function page({ params }: { params: Promise<{ productId: string }> }) {
  const productId = (await params).productId;
  return (
    <div className="flex flex-row justify-center items-center w-full">
      <CartTable productId={productId} />

      <CartInfomation productId={productId} />
    </div>
  );
}
