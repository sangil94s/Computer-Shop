import SwiperCarousel from '@/components/Main/Carousel';
import ProductAddButton from '@/components/Product/ProductAddButton';
import ProductCard from '@/components/Product/ProductCard';
export default function Home() {
  return (
    <>
      <SwiperCarousel />
      <ProductCard />
      <ProductAddButton />
      {/* 아마도 무한스크롤이 들어가지 않을까?? */}
    </>
  );
}
