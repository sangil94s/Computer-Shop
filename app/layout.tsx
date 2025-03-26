import type { Metadata } from 'next';
import './globals.css';
import ReactQueryProvider from './util/ReactQuery/ReactQuery';
import Footer from '@/components/common/Footer';
import TopButton from '@/components/common/Top';
import Header from '@/components/common/Header';
import SessionProvider from '@/components/Auth/SessionProvider';

export const metadata: Metadata = {
  title: 'Computer-Shop',
  description: '개인프로젝트로 컴퓨터 관련 용품을 판매하는 쇼핑몰을 만듭니다.',
  openGraph: {
    title: 'Computer-Shop',
    description: '개인프로젝트로 컴퓨터 관련 용품을 판매하는 쇼핑몰을 만듭니다.',
    images: [
      {
        url: 'https://computer-shop-mu.vercel.app/opens.webp',
        width: 800,
        height: 600,
        alt: '기본 이미지 설명',
      },
    ],
    siteName: 'Computer-Shop',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          <ReactQueryProvider>
            <Header />
            {children}
          </ReactQueryProvider>
          <TopButton />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
