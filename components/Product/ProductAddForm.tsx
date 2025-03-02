// 상품을 추가하는 목적의 Form
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useAdminRedirect from '@/app/util/hooks/useAdminRedirect';

export default function ProductAddForm() {
  useAdminRedirect();
  return (
    <>
      <form className="w-10/12 flex flex-col justify-center m-auto my-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl py-1">[관리자 전용] - 상품 추가 페이지</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="py-1 font-bold">상품 명</h4>
            <Input placeholder="상품명이 들어가는 부분" />
            <p className="text-center text-red-600 font-bold py-2">필수값 없으면 누락되었다는 텍스트 출력</p>
            <h4 className="py-1 font-bold">상품 설명</h4>
            <Input placeholder="상품 설명 들어가는 부분" />
            <p className="text-center text-red-600 font-bold py-2">필수값 없으면 누락되었다는 텍스트 출력</p>

            <h4 className="py-1 font-bold">상품 가격</h4>
            <Input placeholder="상품 가격 들어가는 부분" />
            <p className="text-center text-red-600 font-bold py-2">필수값 없으면 누락되었다는 텍스트 출력</p>

            <h4 className="py-1 font-bold">상품 카테고리</h4>
            {/* Select로? */}

            {/* 이미지 - 클라우디너리로 */}
            <div className="flex justify-center items-center w-full">
              <Button>상품 추가</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
