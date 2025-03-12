/* eslint-disable @typescript-eslint/no-unused-vars */
// 상세 페이지의 보충 이미지 추가하는 폼

'use client';
import useAdminRedirect from '@/app/util/hooks/useAdminRedirect';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CloudinaryResult } from '@/types/types';
interface ProductDetailType {
  productDetailImage: string;
  productId: number;
}
export default function ProductDetailAddForm({ id }: { id: string }) {
  useAdminRedirect();
  const router = useRouter();
  const [publicId, setPublicId] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductDetailType>();

  const onSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/productdetail/${id}`, {
        productId: parseFloat(id),
        productDetailImage: publicId,
      });
      alert('작성이 완료되었어요!');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-max flex flex-col justify-center items-center">
        <h1>보충 이미지 추가</h1>
        <Input defaultValue={parseFloat(id)} {...register('productId', { required: true })} />
        {errors.productId && <p className="text-red-600 text-center font-bold">ID는 필수 값 입니다.</p>}
        <CldUploadWidget
          uploadPreset="skwdfwf2"
          options={{
            maxFiles: 1,
          }}
          onSuccess={result => {
            if (result.event !== 'success') return;
            const info = result.info as CloudinaryResult;
            setPublicId(info.public_id);
          }}
        >
          {({ open }) => (
            <Button onClick={() => open()} className="p-2 my-1 w-full">
              이미지
            </Button>
          )}
        </CldUploadWidget>

        {publicId && <CldImage src={publicId} width={270} height={180} alt="Uploaded Image Not Found" />}
        <div className="flex justify-center items-center w-full">
          <Button className="w-full my-2">상품 추가</Button>
        </div>
      </form>
    </>
  );
}
