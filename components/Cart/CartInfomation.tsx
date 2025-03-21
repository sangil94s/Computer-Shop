/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';

// 장바구니에서 고객 정보 등 을 보여주는 부분 [주문자 성명, 주소 등]

export default function CartInfomation({ productId }: { productId: string }) {
  const fetchCartInfomation = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/cart/${productId}`);
    if (!res.ok) throw new Error('데이터 호출 실패');
    return res.json();
  };

  const { data, isError } = useQuery({
    queryKey: ['CartInfomation'],
    queryFn: fetchCartInfomation,
    staleTime: 1000 * 60 * 5,
  });
  // console.log(data)

  return (
    <>
      {isError && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}

      <div className="w-2/3 h-max mx-1">
        <h1 className="text-center text-xl font-bold py-2">주문자 정보</h1>
        <Button className="w-full my-1">주문하기</Button>
      </div>
    </>
  );
}
