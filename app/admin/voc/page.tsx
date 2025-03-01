// 관리자 용 - VOC 자세히 보기

import VocDetailCard from '@/components/Admin/GetVOC/VocDetailCard';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin VOC Page | Computer-Shop',
  description: '관리자 VOC 조회 페이지',
};
export default function page() {
  return (
    <>
      <VocDetailCard />
    </>
  );
}
