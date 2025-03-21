// 장바구니에 들어가는 상품 테이블?
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CartRemoveButton from './CartRemoveButton';
import dayjs from 'dayjs';

async function getCartUserData({ productId }: { productId: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/cart/${productId}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }

  return res.json();
}
export default async function CartTable({ productId }: { productId: string }) {
  const getCartData = await getCartUserData({ productId });

  return (
    <div className="flex flex-col justify-center w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">상품 명</TableHead>
            <TableHead className="text-center">상품 수량</TableHead>
            <TableHead className="text-center">상품 가격</TableHead>
            <TableHead className="text-center">담은 시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-center">
            <TableCell>{getCartData?.title}</TableCell>
            <TableCell>{getCartData?.totalCount}</TableCell>
            <TableCell>{getCartData?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
            <TableCell>{dayjs(getCartData?.createDate).format('YYYY-MM-DD HH:mm')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CartRemoveButton />
    </div>
  );
}
