// 관리자 한정 - 상품 추가 버튼
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
export default function ProductAddButton() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      {session?.user.name === process.env.NEXT_PUBLIC_ADMIN_AUDIT && (
        <Button onClick={() => router.push('/product/add')} className="m-1 cursor-pointer">
          상품 추가
        </Button>
      )}
    </>
  );
}
