// 아마도 상품 카드가 될 부분

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface ProductAddType {
  id: number;
  category: string;
  title: string;
  price: string;
  purchase: boolean;
  smallDescription: string;
  productImage: string;
  createDate: string;
}

async function getProductDatas() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('데이터 호출 실패');
  }

  return res.json();
}

export default async function ProductCard() {
  const getProductData = await getProductDatas();

  return (
    <>
      {getProductData &&
        getProductData.data.map((item: ProductAddType) => {
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
          const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${item.productImage}`;
          return (
            <Link key={item.id} href={`/product/${item.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <Image src={imageUrl} width={300} height={300} alt="Product Image" />
                  <CardDescription>{item.smallDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>{item.createDate}</p>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
    </>
  );
}
