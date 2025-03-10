// 만약 로그인이 된 사용자가 로그인 페이지에 진입 시 튕겨내는 역할
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const useLoginCheck = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'loading') return;
    if (session?.user?.name) {
      router.push('/');
    }
  }, [session, status, router]);
};
export default useLoginCheck;
