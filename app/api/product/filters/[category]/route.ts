import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const products = await prisma.product.findMany({
    where: { category },
    select: {
      id: true,
      title: true,
      category: true,
      productImage: true,
      price: true,
      purchase: true,
    },
  });

  return NextResponse.json(products);
}
