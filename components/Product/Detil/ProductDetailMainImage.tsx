// 상품 상세 페이지에 해당 상품에 대한 메인 이미지 컴포넌트

import Image from 'next/image';
export interface PostPageTypes {
  params: { id: string };
}

export default async function ProductDetailMainImage({ id }: { id: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }
  const data = await res.json();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${data?.productImage}`;

  return (
    <>
      <Image src={imageUrl} width={600} height={300} alt="Product Image" className="m-auto rounded-md" />
    </>
  );
}
