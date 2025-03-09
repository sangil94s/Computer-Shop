import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || !body.productId || !body.productDetailImage) {
      return NextResponse.json({ message: '필수 값이 누락되었습니다.' }, { status: 400 });
    }

    const newProductDetail = await prisma.productDetail.create({
      data: {
        productId: body.productId,
        productDetailImage: body.productDetailImage,
      },
    });
    return NextResponse.json(newProductDetail);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}
