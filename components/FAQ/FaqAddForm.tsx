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
import { Textarea } from '@/components/ui/textarea';
import useAdminRedirect from '@/app/util/hooks/useAdminRedirect';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// 아마도 FAQ를 작성하는 Form 역할
interface AddTypes {
  category: string;
  title: string;
  description: string;
}
export default function FaqAddForm() {
  const router = useRouter();
  useAdminRedirect();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<AddTypes>();

  const onSubmit = async (data: AddTypes) => {
    try {
      const response = await axios.post('/api/faq', {
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
          <Textarea
            {...register('description', { required: true })}
            placeholder="설명을 입력하시오"
            className="h-40 resize-none"
          />
          {errors.description && <p className="text-red-600 text-center font-bold">설명은 필수 값 입니다.</p>}
        </div>
        <Button type="submit">추가</Button>
      </form>
    </>
  );
}
