import ProductAddButton from '@/components/Product/ProductAddButton';
import ProductCard from '@/components/Product/ProductCard';
import ProductFilter from '@/components/Product/ProductFilter';

export default function Home() {
  return (
    <>
      <ProductFilter />
      <div className="w-full grid grid-cols-1 justify-items-center gap-1 lg:grid-cols-4">
        <ProductCard />
      </div>
      <ProductAddButton />
      {/* 아마도 무한스크롤이 들어가지 않을까?? */}
    </>
  );
}
