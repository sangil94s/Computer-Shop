import { Metadata } from 'next';
import FaqList from '@/components/FAQ/List';
import FaqAddButton from '@/components/FAQ/FaqAddButton';

// 아마도 FAQ를 보여주는 부분
export const metadata: Metadata = {
  title: 'FAQ | Computer-Shop',
  description: 'FAQ Page',
};

export default function page() {
  return (
    <div>
      <FaqList />
      <FaqAddButton />
    </div>
  );
}
