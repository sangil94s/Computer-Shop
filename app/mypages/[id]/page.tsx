// 사용자 마이 페이지
import MyPage from '@/components/Auth/MyPage';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'My Page | Computer-Shop',
  description: '사용자 마이 페이지',
};

export default function page() {
  return (
    <>
      <MyPage />
    </>
  );
}
