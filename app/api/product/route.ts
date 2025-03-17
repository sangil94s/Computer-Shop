import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ProductSchema = z.object({
  title: z.string().min(5, '상품명은 최소 5글자 이상이어야 한다'),
  category: z.string().min(3, '카테고리는 3자 이상이어야한다'),
  smallDescription: z.string().min(5, '상품 간단 설명은 5자 이상이어야 한다'),
  productImage: z.string().min(7, '이미지'),
  price: z.number().int().min(0, '가격은 0 이상이어야 한다.'),
  purchase: z.boolean(),
});
export async function GET() {
  try {
    const data = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        productImage: true,
        price: true,
        purchase: true,
      },
    });
    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: '미 유효 데이터',
          errors: parsed.error.format(),
        },
        { status: 400 },
      );
    }

    const newProduct = await prisma.product.create({
      data: parsed.data,
    });
    return NextResponse.json(newProduct);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}
