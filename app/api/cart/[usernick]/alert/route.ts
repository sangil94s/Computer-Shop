import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ usernick: string }> }) {
  const { usernick } = await params;
  const usernicks = usernick;

  const Carts = await prisma.cart.findMany({
    where: { usernick: usernicks },
  });

  if (Carts.length > 0) {
    return NextResponse.json({ message: 'OK' }, { status: 200 });
    // 상품 있으면 여기
  } else {
    return NextResponse.json({ message: 'No' }, { status: 404 });
    // 상품 없으면 여기
  }
}
