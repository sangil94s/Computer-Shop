/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import useAdminRedirect from '@/app/util/hooks/useAdminRedirect';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import TextEditor from '@/app/util/TextEditor';
import { FAQAddTypes } from '@/types/types';
// 아마도 FAQ를 작성하는 Form 역할

export default function FaqAddForm() {
  const router = useRouter();
  useAdminRedirect();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<FAQAddTypes>();

  const onSubmit = async (data: FAQAddTypes) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/faq`, {
        category: data.category,
        title: data.title,
        description: data.description,
      });
      alert('FAQ 작성이 완료되었어요!');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center m-auto my-1 w-6/12 min-h-screen"
      >
        <h1 className="text-center text-2xl font-bold py-2">FAQ 작성 예제</h1>

        <div className="my-2">
          {' '}
          <label className="py-1 font-bold text-base">카테고리를 선택하시오</label>
          <Controller
            name="category"
            control={control}
            rules={{ required: '카테고리 선택은 필수 값 입니다.' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>카테고리 선택 하시오.</SelectLabel>
                    <SelectItem value="배송">배송</SelectItem>
                    <SelectItem value="주문">주문</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-red-600 text-center font-bold">카테고리 선택은 필수 값 입니다.</p>}
        </div>

        <div className="my-2 w-full">
          <label className="py-1 font-bold text-base">제목을 입력하시오</label>
          <Input {...register('title', { required: true })} placeholder="제목을 입력하시오" />
          {errors.title && <p className="text-red-600 text-center font-bold">제목은 필수 값 입니다.</p>}
        </div>

        <div className="my-2 w-full">
          <label className="py-1 font-bold text-base">설명을 입력하시오</label>
          <TextEditor value={watch('description') || ''} onChange={content => setValue('description', content)} />
          {errors.description && <p className="text-red-600 text-center font-bold">설명은 필수 값 입니다.</p>}
        </div>
        <Button type="submit">추가</Button>
      </form>
    </>
  );
}
