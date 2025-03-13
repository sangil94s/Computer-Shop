// 아마도 상품 카드가 될 부분
'use client';
import Image from 'next/image';
import Nodata from '../common/Nodata';
import ProductRemoveButton from './ProductRemoveButton';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import ProductFilter from './ProductFilter';
import { ProductCardTypes } from '@/types/types';
import { useRouter } from 'next/navigation';

const fetchProducts = async (category: string | null) => {
  const url = category
    ? `${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/filters/${category}`
    : `${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('데이터 호출 실패');
  return res.json();
};

export default function ProductCard() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {
    data: products,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
    staleTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    refetch();
  }, [selectedCategory, refetch]);
  return (
    <>
      <ProductFilter onCategoryChange={setSelectedCategory} />
      {error && <p>데이터를 불러오는 중 오류 발생: {error.message}</p>}
      {products?.length > 0 ? (
        products.map((item: ProductCardTypes) => {
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
          const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${item.productImage}`;
          return (
            <div
              className="flex flex-row justify-center items-center m-auto"
              key={item.id}
              onClick={() => router.push(`/product/${item.id}`)}
            >
              <section className="border border-slate-300 px-1 my-1">
                <h1 className="text-base lg:text-xl font-bold py-2">제목 : {item.title}</h1>
                <Image src={imageUrl} width={300} height={300} alt="Product Image" className="rounded-md" />
                <p className="font-bold py-2">간단 설명 : {item.smallDescription}</p>

                {item.purchase === true ? (
                  <p className="text-center font-bold py-2">{item.price.toLocaleString()}원</p>
                ) : (
                  <p className="text-center text-red-600 font-bold py-2">이 상품은 품절이에요!</p>
                )}

                <ProductRemoveButton ids={item.id} />
              </section>
            </div>
          );
        })
      ) : (
        <Nodata />
      )}
    </>
  );
}
