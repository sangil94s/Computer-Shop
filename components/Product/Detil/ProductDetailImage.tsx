import Nodata from '@/components/common/Nodata';
import Image from 'next/image';

// 아마도 상품 상세 페이지 아래에 상세 이미지 역할을 할 부분?

export default async function ProductDetailImage({ id }: { id: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/productdetail/${parseFloat(id)}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    console.log('데이터 호출 실패: 응답이 정상적이지 않습니다.', res.status, res.statusText);
    return;
  }

  const data = await res.json();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${data?.productDetailImage}`;

  return (
    <div className="w-full h-96 flex flex-col justify-center border-t-2 border-slate-200 my-1">
      <h1 className="text-center text-xl font-bold py-2">Detail Infomation</h1>
      {data !== null && <Image src={imageUrl} width={400} height={300} alt="이미지" />}
      {data === null && <Nodata />}
    </div>
  );
}
