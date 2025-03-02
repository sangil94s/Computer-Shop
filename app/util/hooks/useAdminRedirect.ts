'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// NextAuth로 받은 세션과 !== NEXT_PUBLIC_ADMIN_AUDIT 이면 메인 페이지로 리턴
const useAdminRedirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const adminAudit = process.env.NEXT_PUBLIC_ADMIN_AUDIT;

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user?.name || session.user.name !== adminAudit) {
      router.push('/');
    }
  }, [session, status, router, adminAudit]);
};

export default useAdminRedirect;
