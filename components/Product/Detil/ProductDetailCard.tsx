'use client';
import { Button } from '../../ui/button';
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
import { BsCartPlus } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ProductDetailCardTypes } from '@/types/types';
// 상품 상세 페이지에 상품 정보가 들어갈 부분

const fetchProducts = async ({ id }: { id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/${id}`, { cache: 'no-store' });
  return res.json();
};

export default function ProductDetailCard({ id }: { id: string }) {
  const router = useRouter();
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

  /* 상품 정보 장바구니 보내는 초안 */
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<ProductDetailCardTypes>();

  const onSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/cart/${session?.user.nickname}`, {
        productId: parseFloat(products?.id),
        title: products?.title,
        totalPrice: String(totalPrice),
        totalCount: String(quantity),
        usernick: session?.user.nickname,
      });
      alert('완료되었어요!');
      router.push(`/cart/${products?.id}`);
    } catch (e) {
      console.error(e);
    }
  };
  /* 상품 정보 장바구니 보내는 초안 */

  return (
    <>
      <section className="w-full lg:w-4/12 h-max m-auto">
        <section>
          <label className="font-bold">상품명</label>
          <h1 className="pt-2 pb-10 text-xl lg:text-3xl font-bold">{products?.title}</h1>
        </section>

        <section>
          <label className="font-bold">상품 간단 설명</label>
          <p className="pb-10 pt-2">{products?.smallDescription}</p>
        </section>
        <div className="my-4 w-full">
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

        <section>
          <label className="font-bold">최종 가격</label>
          <h3 className="pt-2 pb-4 text-2xl font-bold">{totalPrice.toLocaleString()} 원</h3>
        </section>
        {products?.purchase === true && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit" className="my-4 font-bold w-full lg:w-full" disabled={session === null}>
              <BsCartPlus /> 장바구니 담기
            </Button>

            <h4 className="py-4 text-red-600 text-base font-bold">로그인을 해야 장바구니에 담을 수 있어요!</h4>
          </form>
        )}

        {products?.purchase === false && (
          <p className="text-red-600 text-center text-xl font-bold py-2">이 상품은 품절이에요!</p>
        )}
      </section>
    </>
  );
}
