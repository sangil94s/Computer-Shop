import Nodata from '@/components/common/Nodata';
import Image from 'next/image';

// 아마도 상품 상세 페이지 아래에 상세 이미지 역할을 할 부분?

export default async function ProductDetailImage({ id }: { id: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/productdetail/${parseFloat(id)}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return <Nodata />; // 404 응답 나오면 여기 컴포넌트를 응답하도록
  }

  const data = await res.json();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${data?.productDetailImage}`;
  return (
    <div className="w-full h-max flex flex-col justify-center items-center border-t-2 border-slate-200 my-1">
      <h1 className="text-center text-xl font-bold py-2">상세 이미지</h1>
      {data !== null && <Image src={imageUrl} width={400} height={300} alt="이미지" className="rounded-lg" />}
    </div>
  );
}
