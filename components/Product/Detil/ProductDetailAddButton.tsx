'use client';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// 상품 상세페이지의 보충 설명용 이미지를 추가하는 버튼

export default function ProductDetailAddButton({ id }: { id: string }) {
  const { data: session } = useSession();
  return (
    <>
      {session?.user.name === process.env.NEXT_PUBLIC_ADMIN_AUDIT && (
        <Link href={`/product/${id}/detail`}>
          <Button>상세 이미지 추가</Button>
        </Link>
      )}
    </>
  );
}
