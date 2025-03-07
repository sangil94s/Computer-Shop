'use client';

import useAdminRedirect from '@/app/util/hooks/useAdminRedirect';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AiOutlineDelete } from 'react-icons/ai';
export default function VocDetailRemoveButton({ ids }: { ids: number }) {
  useAdminRedirect();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('이 문의를 삭제할 건가요???')) {
      return;
    }
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/voc/${ids}`);
      alert('삭제 성공!');
      router.push('/admin/voc');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button className="w-full my-1" onClick={() => handleDelete()}>
        <AiOutlineDelete /> 삭제
      </Button>
    </>
  );
}
