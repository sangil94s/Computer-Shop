'use client';

import useAdminRedirect from '@/app/util/hooks/useAdminRedirect';
import { Button } from '../ui/button';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

export default function ProductRemoveButton({ ids }: { ids: number }) {
  useAdminRedirect();

  const handleDelete = async () => {
    if (!confirm('이 상품을 삭제할 건가요???')) {
      return;
    }
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/product/${ids}`);
      alert('삭제 성공!');
      location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const { data: session } = useSession();

  return (
    <>
      {session?.user.name === process.env.NEXT_PUBLIC_ADMIN_AUDIT && (
        <Button className="w-full my-1" onClick={() => handleDelete()}>
          <AiOutlineDelete />
          삭제
        </Button>
      )}
    </>
  );
}
