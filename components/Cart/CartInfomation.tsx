'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { AiOutlineDollarCircle } from 'react-icons/ai';

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

  const temppurchase = () => {
    alert('구현 예정이에요!');
  };

  return (
    <>
      {isError && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}

      <div className="w-2/3 h-max mx-1">
        <h1 className="text-center text-xl font-bold py-2">주문자 정보</h1>
        <p className="py-2">주문자 닉네임 : {data?.usernick}</p>
        <Button onClick={() => temppurchase()} className="w-full my-1">
          <AiOutlineDollarCircle /> 주문하기
        </Button>
      </div>
    </>
  );
}
