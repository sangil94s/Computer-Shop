'use client';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';

// 상품 상세페이지의 보충 설명용 이미지를 추가하는 버튼

const fetchProductDetailImage = async ({ id }: { id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/productdetail/${parseFloat(id)}`, { cache: 'no-store' });
  return res.json();
};

export default function ProductDetailAddButton({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: productImage } = useQuery({
      queryKey: ['productDetailImage', id],
      queryFn: () => fetchProductDetailImage({ id }),
      staleTime: 1000 * 60 * 5,
  });

  // console.log(productImage?.productDetailImage)
  return (
    <>
      {session?.user.name === process.env.NEXT_PUBLIC_ADMIN_AUDIT && typeof productImage?.productDetailImage !== 'string' && (
        <Button onClick={() => router.push(`/product/${id}/detail`)}>
          <AiOutlinePlus /> 상세 이미지 추가
        </Button>
      )}
    </>
  );
}
