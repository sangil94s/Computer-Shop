// 아마도 상품 카드가 될 부분
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import Nodata from '../common/Nodata';
import ProductRemoveButton from './ProductRemoveButton';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import ProductFilter from './ProductFilter';

interface ProductAddType {
  id: number;
  category: string;
  title: string;
  price: number;
  purchase: boolean;
  smallDescription: string;
  productImage: string;
  createDate: string;
}

const fetchProducts = async (category: string | null) => {
  const url = category
    ? `${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/filters/${category}`
    : `${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('데이터 호출 실패');
  return res.json();
};

export default function ProductCard() {
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
        products.map((item: ProductAddType) => {
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
          const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${item.productImage}`;
          return (
            <Link key={item.id} href={`/product/${item.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>제목 : {item.title}</CardTitle>
                  <Image src={imageUrl} width={300} height={300} alt="Product Image" />
                  <CardDescription>간단 설명 : {item.smallDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  {item.purchase === true ? (
                    <p className="text-center font-bold py-2">{item.price.toLocaleString()}원</p>
                  ) : (
                    <p className="text-center text-red-600 font-bold py-2">이 상품은 품절이에요!</p>
                  )}
                </CardContent>
                <ProductRemoveButton ids={item.id} />
              </Card>
            </Link>
          );
        })
      ) : (
        <Nodata />
      )}
    </>
  );
}
