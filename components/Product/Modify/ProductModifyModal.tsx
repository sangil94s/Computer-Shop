// 관리자 전용 - 상품 정보 수정하는 Modal
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
interface ProductModifyType {
  smallDescription: string;
  price: number;
  purchase?: boolean;
}
export default function ProductModifyModal({ ids }: { ids: number }) {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<ProductModifyType>();

  const onSubmit = async (data: ProductModifyType) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/${ids}`, {
        smallDescription: data.smallDescription,
        price: data.price,
        purchase: data.purchase,
      });
      alert('수정이 완료되었어요!');
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {session?.user.name === process.env.NEXT_PUBLIC_ADMIN_AUDIT && (
        <Dialog>
          <DialogTrigger className="text-center text-black font-bold w-full">상품 정보 수정하기</DialogTrigger>
          <DialogContent>
            <DialogHeader onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle>관리자 한정 - 상품 수정 Modal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input {...register('smallDescription', { required: true })} placeholder="상품 간단 소개를 입력하시오" />
              {errors.smallDescription && (
                <p className="text-red-600 text-center font-bold">상품 간단 소개는 필수 값 입니다.</p>
              )}
              <Input
                type="number"
                {...register('price', {
                  required: true,
                  valueAsNumber: true,
                })}
                placeholder="상품 가격은 필수값 입니다."
                className="my-1"
              />
              {errors.price && <p className="text-red-600 text-center font-bold">상품 가격은 필수 값 입니다.</p>}
              <Controller
                name="purchase"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={value => field.onChange(value === 'true')}
                    value={field.value !== undefined ? String(field.value) : ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="구매 가능 여부 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>구매 가능 여부 선택</SelectLabel>
                        <SelectItem value="true">구매 가능</SelectItem>
                        <SelectItem value="false">품절</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.purchase && (
                <p className="text-red-600 text-center font-bold">구매 가능 여부 선택은 필수 값 입니다.</p>
              )}

              <Button className="w-full" type="submit">
                수정하기
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
