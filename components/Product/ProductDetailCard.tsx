'use client';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
// 상품 상세 페이지에 상품 정보가 들어갈 부분

const fetchProducts = async ({ id }: { id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/${id}`, { cache: 'no-store' });
  return res.json();
};

export default function ProductDetailCard({ id }: { id: string }) {
  const { data: products } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => fetchProducts({ id }),
    staleTime: 1000 * 60 * 5,
  });

  const { data: session } = useSession();

  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(products?.price || 0);

  useEffect(() => {
    if (products) {
      setTotalPrice(products.price * quantity);
    }
  }, [quantity, products]);

  return (
    <>
      <section className="w-full lg:w-1/6 h-max">
        <div className="w-full m-1 flex flex-col justify-center items-center lg:items-start">
          <h1 className="pt-4 pb-10 text-xl lg:text-3xl font-bold">상품명 : {products?.title}</h1>
          <p className="pb-10">상품 간단 설명 : {products?.smallDescription}</p>

          <div className="my-4 w-7/12">
            <label className="font-bold text-base">수량을 선택하시오</label>
            <Select onValueChange={value => setQuantity(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="수량을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel defaultValue={1}>수량을 선택 하시오.</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <h3 className="py-8 text-2xl font-bold border-y-2 border-slate-300">
            최종 가격 : {totalPrice.toLocaleString()} 원
          </h3>

          {products?.purchase === true && (
            <>
              <Link href="/cart">
                <Button className="my-4 font-bold" disabled={session === null}>
                  장바구니 담기
                </Button>
              </Link>
              <h4 className="py-4 text-red-600 font-bold">로그인을 해야 장바구니에 담을 수 있어요!</h4>
            </>
          )}

          {products?.purchase === false && (
            <p className="text-red-600 text-center text-xl font-bold py-2">이 상품은 품절이에요!</p>
          )}
        </div>
      </section>
    </>
  );
}
