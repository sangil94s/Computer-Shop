import Image from 'next/image';
import { Button } from '../ui/button';

// 상품 상세 페이지에 상품 정보가 들어갈 부분

export interface PostPageTypes {
  params: { id: string };
}

export default async function ProductDetailCard({ id }: { id: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }
  const data = await res.json();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${data?.productImage}`;
  return (
    <>
      <section className="w-full h-96 grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-1">
        <div className="w-full border border-slate-300 rounded-md my-1">
          <Image
            src={imageUrl}
            width={600}
            height={300}
            alt="Product Image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="w-full border border-slate-300 rounded-md my-1">
          <h1>상품명 : {data?.title}</h1>
          <p>상품 간단 설명 : {data?.smallDescription}</p>
          <p>가격 : {data?.price}원</p>
          <p>수량 : 00000</p>
          <Button>장바구니 담기</Button>
        </div>
      </section>
    </>
  );
}
