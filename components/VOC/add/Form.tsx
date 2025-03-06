/* eslint-disable @typescript-eslint/no-unused-vars */
// 익명 문의를 제출받는 Form 컴포넌트
'use client';

import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextEditor from '@/app/util/TextEditor';

interface AddTypes {
  category: string;
  title: string;
  description: string;
}
export default function VocAddForm() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddTypes>();

  const onSubmit = async (data: AddTypes) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/voc`, {
        category: data.category,
        title: data.title,
        description: data.description,
      });
      alert('건의사항 작성이 완료되었어요!');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center my-1 w-full min-h-screen"
      >
        <h1 className="text-center text-2xl font-bold py-2">익명 건의 또는 문의 Form</h1>

        <div className="my-2">
          {' '}
          {/* Select 부분 수정 필요함 */}
          <label className="py-1 font-bold text-base">카테고리를 선택하시오</label>
          <Select onValueChange={value => setValue('category', value)}>
            <SelectTrigger className="w-[280px]">
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
