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
import ProductModifyModal from './Modify/ProductModifyModal';
import { Skeleton } from '../ui/skeleton';

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
    isLoading,
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
      <div className="grid place-items-center">
        <div className="grid grid-rows-1 lg:grid-cols-6 justify-items-center gap-2">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((SkleetonItem, index) => (
                <div key={index} className="bg-gray-300">
                  <section className="px-1 my-1">
                    <Skeleton className="w-[320px] h-48" />
                  </section>
                </div>
              ))
          ) : products?.length > 0 ? (
            products.map((item: ProductCardTypes) => {
              const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
              const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_300,h_300,c_fill/${item.productImage}`;
              return (
                <div className="cursor-pointer" key={item.id}>
                  <section className="px-1 my-1" onClick={() => router.push(`/product/${item.id}`)}>
                    <Image src={imageUrl} width={320} height={300} alt="Product Image" className="rounded-md" />
                    <h1 className="text-base lg:text-xl font-bold py-2">{item.title}</h1>
                    {item.purchase === true ? (
                      <p className="font-bold py-2">{item.price.toLocaleString()}원</p>
                    ) : (
                      <p className="text-red-600 font-bold py-2">이 상품은 품절이에요!</p>
                    )}

                    <ProductRemoveButton ids={item.id} />
                  </section>
                  <ProductModifyModal ids={item.id} />
                </div>
              );
            })
          ) : (
            <Nodata />
          )}
        </div>
      </div>
    </>
  );
}
