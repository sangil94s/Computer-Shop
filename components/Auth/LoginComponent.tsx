'use client';

import useLoginCheck from '@/app/util/hooks/useLoginCheck';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  useLoginCheck();
  return (
    <div className="flex flex-col justify-center items-center border border-slate-300 rounded-md w-6/12">
      <h1 className="text-center text-2xl font-bold py-4">Computer-Shop</h1>

      <h4 className="text-xl font-bold py-21">로그인</h4>
      <button
        className="bg-green-500 text-white font-bold p-4 m-4 rounded-md w-6/12"
        onClick={() => signIn('naver', { callbackUrl: '/' })}
      >
        네이버 로그인
      </button>
    </div>
  );
}
