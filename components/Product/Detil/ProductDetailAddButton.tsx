import { Button } from '@/components/ui/button';
import Link from 'next/link';

// 상품 상세페이지의 보충 설명용 이미지를 추가하는 버튼

export default async function ProductDetailAddButton({ id }: { id: string }) {
  return (
    <>
      <Link href={`/product/${id}/detail`}>
        <Button>상세 이미지 추가</Button>
      </Link>
    </>
  );
}
