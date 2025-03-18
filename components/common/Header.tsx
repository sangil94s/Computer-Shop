'use client';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import {
  AiOutlineMenu,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineCustomerService,
  AiOutlineUserDelete,
} from 'react-icons/ai';
import { signOut, useSession } from 'next-auth/react';
// Header
export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      <header className="flex flex-row justify-between w-full h-16 border-b-2 border-slate-200 bg-white mb-1">
        <Link href="/" className="text-2xl font-bold px-2 py-4">
          Computer-Shop
        </Link>

        <section className="px-2 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AiOutlineMenu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col justify-center items-center">
              {session?.user.name === process.env.NEXT_PUBLIC_ADMIN_AUDIT && (
                <DropdownMenuItem className="text-center cursor-pointer" onClick={() => router.push('/admin')}>
                  <AiOutlineSetting /> 관리자 페이지
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/faq')}>
                <AiOutlineQuestionCircle /> 자주 묻는 질문
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/voc/add')}>
                <AiOutlineCustomerService /> 익명 건의
              </DropdownMenuItem>
              {session && (
                <DropdownMenuItem className="font-bold cursor-pointer" onClick={() => signOut()}>
                  <AiOutlineUserDelete /> 로그아웃
                </DropdownMenuItem>
              )}
              {session === null && (
                <DropdownMenuItem className="font-bold cursor-pointer" onClick={() => router.push('/auth/logins')}>
                  <AiOutlineUserDelete /> 로그인
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </header>
    </>
  );
}
