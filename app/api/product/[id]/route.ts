import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const requestedId = Number(id);

  const products = await prisma.product.findUnique({
    where: { id: requestedId },
  });

  if (!products) {
    return NextResponse.json({ error: 'ID NOT FOUND' }, { status: 404 });
  }

  return NextResponse.json(products);
}
