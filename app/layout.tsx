import type { Metadata } from 'next';
import './globals.css';
import ReactQueryProvider from './util/ReactQuery/ReactQuery';
import Footer from '@/components/common/Footer';
import TopButton from '@/components/common/Top';
import Header from '@/components/common/Header';

export const metadata: Metadata = {
  title: 'Computer-Shop',
  description: '개인프로젝트로 컴퓨터 관련 용품을 판매하는 쇼핑몰을 만듭니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <TopButton />
        <Footer />
      </body>
    </html>
  );
}
