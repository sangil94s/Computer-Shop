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
            <DropdownMenuContent>
              {session?.user.name === process.env.NEXT_PUBLIC_ADMIN_AUDIT && (
                <DropdownMenuItem className="text-center" onClick={() => router.push('/admin')}>
                  <AiOutlineSetting /> Admin
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/faq')}>
                <AiOutlineQuestionCircle /> FAQ
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/voc/add')}>
                <AiOutlineCustomerService /> VOC
              </DropdownMenuItem>
              {session && (
                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                  <AiOutlineUserDelete /> Logout
                </DropdownMenuItem>
              )}
              {session === null && (
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/auth/logins')}>
                  <AiOutlineUserDelete /> Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </header>
    </>
  );
}
