// 위로가기 버튼
'use client';
import { AiFillCaretUp } from 'react-icons/ai';

export default function TopButton() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div onClick={scrollTop} className="fixed bottom-16 right-8 z-50 border rounded-full bg-white shadow-lg">
        <AiFillCaretUp className="text-3xl cursor-pointer" />
      </div>
    </>
  );
}
