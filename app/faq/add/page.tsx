// 고객문의를 추가하는 Form 관리자 전용
import FaqAddForm from '@/components/FAQ/FaqAddForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ Add | Computer-Shop',
  description: 'FAQ ADD Page',
};
export default function page() {
  return (
    <>
      <FaqAddForm />
    </>
  );
}
