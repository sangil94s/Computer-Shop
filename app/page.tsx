import ProductAddButton from '@/components/Product/ProductAddButton';
import ProductCard from '@/components/Product/ProductCard';
import ProductFilter from '@/components/Product/ProductFilter';

export default function Home() {
  return (
    <>
      <ProductFilter />
      <div className="grid grid-cols-4 justify-items-center gap-1">
        <ProductCard />
        <ProductCard />
      </div>
      <ProductAddButton />
      {/* 아마도 무한스크롤이 들어가지 않을까?? */}
    </>
  );
}
