// FAQ 추가하는 버튼 [관리자 전용]
'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function FaqAddButton() {
  const router = useRouter();
  return (
    <>
      <Button className="m-1" onClick={() => router.push('/faq/add')}>
        관리자 전용 - 추가
      </Button>
    </>
  );
}
