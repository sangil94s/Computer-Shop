import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const Id = Number(id);

  const Cart = await prisma.cart.findUnique({
    where: { id: Id },
  });

  if (!Cart) {
    return NextResponse.json({ error: 'Cart ID NOT FOUND' }, { status: 404 });
  }

  await prisma.cart.delete({ where: { id: Id } });

  return NextResponse.json({});
}
