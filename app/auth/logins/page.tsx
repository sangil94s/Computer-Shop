import LoginButton from '@/components/Auth/LoginComponent';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Login | Computer-Shop',
  description: '로그인 페이지',
};

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center my-2">
      <LoginButton />
    </div>
  );
}
