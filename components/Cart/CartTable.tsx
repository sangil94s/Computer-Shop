// 장바구니에 들어가는 상품 테이블?
'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CartRemoveButton from './CartRemoveButton';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

export default function CartTable({ productId }: { productId: string }) {
  const fetchCartTableInfomation = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/cart/${productId}`);
    if (!res.ok) throw new Error('데이터 호출 실패');
    return res.json();
  };

  const { data, isError } = useQuery({
    queryKey: ['CartTableInfomation'],
    queryFn: fetchCartTableInfomation,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="flex flex-col justify-center w-full">
      {isError && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}

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
            <TableCell>{data?.title}</TableCell>
            <TableCell>{data?.totalCount}</TableCell>
            <TableCell>{data?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
            <TableCell>{dayjs(data?.createDate).format('YYYY-MM-DD HH:mm')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CartRemoveButton />
    </div>
  );
}
