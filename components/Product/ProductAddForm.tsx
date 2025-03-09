/* eslint-disable @typescript-eslint/no-unused-vars */
// 상품을 추가하는 목적의 Form
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useAdminRedirect from '@/app/util/hooks/useAdminRedirect';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiFillFileImage } from 'react-icons/ai';
interface ProductAddTypes {
  category: string;
  title: string;
  price: number;
  smallDescription: string;
  productImage: string;
  purchase?: boolean;
}

interface CloudinaryResult {
  public_id: string;
}
export default function ProductAddForm() {
  const router = useRouter();
  useAdminRedirect();
  const [publicId, setPublicId] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductAddTypes>();

  const onSubmit = async (data: ProductAddTypes) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product`, {
        category: data.category,
        title: data.title,
        price: data.price,
        smallDescription: data.smallDescription,
        purchase: data.purchase,
        productImage: publicId,
      });
      alert('작성이 완료되었어요!');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-10/12 flex flex-col justify-center m-auto my-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl py-1">[관리자 전용] - 상품 추가 페이지</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="py-1 font-bold">상품 명</h4>
            <Input {...register('title', { required: true })} placeholder="상품명이 들어가는 부분" />
            {errors.title && <p className="text-red-600 text-center font-bold">제목은 필수 값 입니다.</p>}
            <h4 className="py-1 font-bold">상품 설명</h4>
            <Input {...register('smallDescription', { required: true })} placeholder="상품 설명 들어가는 부분" />
            {errors.smallDescription && (
              <p className="text-red-600 text-center font-bold">상품 설명은 필수 값 입니다.</p>
            )}

            <h4 className="py-1 font-bold">상품 가격 - 숫자만 입력</h4>
            <Input
              type="number"
              {...register('price', {
                required: true,
                valueAsNumber: true,
              })}
              placeholder="상품 가격 들어가는 부분"
            />
            {errors.price && <p className="text-red-600 text-center font-bold">상품 가격은 필수 값 입니다.</p>}

            <div className="my-2">
              {' '}
              {/* Select 부분 수정 필요함 */}
              <label className="py-1 font-bold text-base">카테고리를 선택하시오</label>
              <Select onValueChange={value => setValue('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>카테고리 선택 하시오.</SelectLabel>
                    <SelectItem value="모니터">모니터</SelectItem>
                    <SelectItem value="그래픽카드">그래픽카드</SelectItem>
                    <SelectItem value="CPU">CPU</SelectItem>
                    <SelectItem value="SSD">SSD</SelectItem>
                    <SelectItem value="HDD">HDD</SelectItem>
                    <SelectItem value="Ram">Ram</SelectItem>
                    <SelectItem value="파워 서플라이">파워 서플라이</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* 상품 구매 가능 여부 */}
            <h4 className="py-1 font-bold">구매 가능 여부</h4>
            <Select onValueChange={value => setValue('purchase', value === 'true')}>
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

            {/* Select로? */}

            {/* 이미지 - 클라우디너리로 */}
            <CldUploadWidget
              uploadPreset="skwdfwf2"
              options={{
                maxFiles: 1,
              }}
              onSuccess={(result, widget) => {
                if (result.event !== 'success') return;
                const info = result.info as CloudinaryResult;
                setPublicId(info.public_id);
              }}
            >
              {({ open }) => (
                <Button onClick={() => open()} className="p-2 my-1 w-full">
                  <AiFillFileImage /> 이미지
                </Button>
              )}
            </CldUploadWidget>

            {publicId && <CldImage src={publicId} width={270} height={180} alt="Uploaded Image Not Found" />}

            <div className="flex justify-center items-center w-full">
              <Button className="w-full my-2">상품 추가</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
