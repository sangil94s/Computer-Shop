import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CartSchema = z.object({
  title: z.string().min(5, '상품명은 최소 5글자 이상이어야 한다').max(25, '상품 명 은 최대 25글자 이하 여야 한다'),
  totalPrice: z.string().min(3, '가격은 3자 이상이어야한다').max(10, '가격은 10자 이하 여야한다'),
  totalCount: z.string().min(1, '상품 수량은 1 이상이어야 한다'),
  usernick: z.string().min(1, '사용자 닉네임은 3자 이상이어야 한다'),
  productId: z.number().int(),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ usernick: string }> }) {
  const { usernick } = await params;
  const usernicks = usernick;

  const Carts = await prisma.cart.findMany({
    where: { usernick: usernicks },
  });

  if (!Carts || Carts.length === 0) {
    return NextResponse.json({ error: '장바구니 데이터 없음' }, { status: 404 });
  }

  return NextResponse.json(Carts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CartSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: '미 유효 데이터',
          errors: parsed.error.format(),
        },
        { status: 400 },
      );
    }

    const newCart = await prisma.cart.create({
      data: parsed.data,
    });
    return NextResponse.json(newCart);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}
