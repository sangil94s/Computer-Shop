// 장바구니에 있는 상품 삭제 목적
'use client';

import { Button } from '../ui/button';
import { AiOutlineClose } from 'react-icons/ai';

export default function CartRemoveButton() {
  return (
    <>
      <Button className="my-2">
        <AiOutlineClose /> 전체 삭제
      </Button>
    </>
  );
}
