// 관리자 한정 - 상품 추가 버튼
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function ProductAddButton() {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push('/product/add')} className="m-1 cursor-pointer">
        상품 추가
      </Button>
    </>
  );
}
