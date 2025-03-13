// 상품이 몇개인지 관리자 페이지에 보여줄 API
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const categoryCounts = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    });
    const response: Record<string, number> = {};

    categoryCounts.forEach(item => {
      response[item.category] = item._count.category;
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '데이터 호출 실패' }, { status: 500 });
  }
}
