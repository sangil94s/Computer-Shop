'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function VocDetailRemoveButton({ ids }: { ids: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('이 문의를 삭제할 건가요???')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/voc/${ids}`);
      alert('삭제 성공!');
      router.push('/admin/voc');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={() => handleDelete()}>삭제</Button>
    </>
  );
}
