// 아마도 익명으로 건의를 남기게 하는 목적의 페이지
import VocAddForm from '@/components/VOC/add/Form';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Voc Add | Computer-Shop',
  description: '익명으로 건의사항을 작성하는 부분',
};

export default function page() {
  return (
    <>
      <VocAddForm />
    </>
  );
}
