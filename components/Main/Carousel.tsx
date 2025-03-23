// 상단의 홍보 배너 역할의 컴포넌트

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const images = ['/Images/Carousel1.webp', '/Images/Carousel2.webp'];
export default function SwiperCarousel() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              width={1200}
              height={400}
              alt={`이미지 ${index + 1}`}
              className="h-64 object-cover rounded-lg"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
