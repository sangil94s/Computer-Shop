import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const requestedId = Number(id);

  const products = await prisma.product.findUnique({
    where: { id: requestedId },
    select: {
      id: true,
      title: true,
      category: true,
      productImage: true,
      price: true,
      purchase: true,
      smallDescription: true,
    },
  });

  if (!products) {
    return NextResponse.json({ error: 'ID NOT FOUND' }, { status: 404 });
  }

  return NextResponse.json(products);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const requestedId = Number(id);

  const Product = await prisma.product.findUnique({
    where: { id: requestedId },
  });

  if (!Product) {
    return NextResponse.json({ error: 'Product ID NOT FOUND' }, { status: 404 });
  }

  await prisma.product.delete({ where: { id: requestedId } });

  return NextResponse.json({});
}
