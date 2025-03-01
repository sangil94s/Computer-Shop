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
  AiOutlineIdcard,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineCustomerService,
  AiOutlineUserDelete,
} from 'react-icons/ai';
// Header
export default function Header() {
  const router = useRouter();

  const tempslogout = () => {
    alert('구현 예정 입니다!');
  };
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
              <DropdownMenuItem className="text-center cursor-pointer" onClick={() => router.push('/mypages/1')}>
                <AiOutlineIdcard /> My Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-center">
                <AiOutlineSetting /> Admin
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/faq')}>
                <AiOutlineQuestionCircle /> FAQ
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/voc/add')}>
                <AiOutlineCustomerService /> VOC
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => tempslogout()}>
                <AiOutlineUserDelete /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </header>
    </>
  );
}
