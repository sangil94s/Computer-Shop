'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <button
        className="bg-green-500 text-white font-bold p-4 rounded-md"
        onClick={() => signIn('naver', { callbackUrl: '/' })}
      >
        네이버 로그인
      </button>
    </div>
  );
}
