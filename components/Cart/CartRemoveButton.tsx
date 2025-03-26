// 장바구니에 있는 상품 삭제 목적
'use client';

import { Button } from '../ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function CartRemoveButton({ id }: { id: number }) {
  const { data: session } = useSession();
  const handleDelete = async () => {
    if (!confirm('이 장바구니 상품을 삭제할 건가요???')) {
      return;
    }
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/cart/${session?.user.name}/${id}`);
      alert('삭제 성공!');
      location.reload();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Button className="my-2" onClick={() => handleDelete()}>
        <AiOutlineClose /> 삭제
      </Button>
    </>
  );
}
