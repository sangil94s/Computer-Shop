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
import { BsBasket, BsBasket2Fill } from 'react-icons/bs';
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

// Header
export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const fetchUserCartInfomation = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/cart/${session?.user.nickname}/alert`);
    if (!res.ok) throw new Error('데이터 호출 실패');
    return res.json();
  };
  const { data, isError } = useQuery({
    queryKey: ['CartInfomations'],
    queryFn: fetchUserCartInfomation,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {isError && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}
      <header className="flex flex-row justify-around w-full h-16 bg-white mb-1">
        <Link href="/" className="text-2xl font-bold px-2 py-4">
          Computer-Shop
        </Link>

        <div className="grid grid-cols-2 justify-items-center text-xl">
          <section className="px-4 py-6">
            {/* 사용자 장바구니 구분용 -> 상품 있으면 2Fill, 없으면 Basket */}
            {data?.message === 'OK' ? (
              <BsBasket2Fill
                className="cursor-pointer"
                onClick={() => router.push(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/cart/${session?.user.nickname}`)}
              />
            ) : (
              <BsBasket />
            )}
          </section>
          <section className="px-4 py-6">
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="드랍다운 매뉴">
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
        </div>
      </header>
    </>
  );
}
