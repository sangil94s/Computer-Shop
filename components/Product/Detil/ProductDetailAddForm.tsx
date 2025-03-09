// 상세 페이지의 보충 이미지 추가하는 폼

'use client';

export default function ProductDetailAddForm({ id }: { id: string }) {
  console.log(id);
  return (
    <>
      <form className="w-full h-max flex flex-col justify-center items-center">
        <h1>보충 이미지 추가</h1>
      </form>
    </>
  );
}
