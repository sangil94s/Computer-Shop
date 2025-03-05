import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await prisma.product.findMany();
    return Response.json({ data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        category: body.category,
        title: body.title,
        price: body.price,
        purchase: body.purchase,
        smallDescription: body.smallDescription,
        productImage: body.productImage,
      },
    });
    return NextResponse.json(newProduct);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}
