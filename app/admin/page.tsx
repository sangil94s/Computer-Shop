// 관리자 페이지
// 추후 hook 등 으로 해서 특정 사용자만 들어오도록

import GetVOC from '@/components/Admin/GetVOC/GetVoc';
import { ProductCategoryChart } from '@/components/Admin/ProductCategory/ProductCategoryChart';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin Page | Computer-Shop',
  description: '관리자 페이지',
};
export default function page() {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <section>
        <GetVOC />

        <ProductCategoryChart />
      </section>
    </div>
  );
}
