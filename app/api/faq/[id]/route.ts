import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const requestedId = Number(id);

  const Faq = await prisma.faq.findUnique({
    where: { id: requestedId },
  });

  if (!Faq) {
    return NextResponse.json({ error: 'FAQ ID NOT FOUND' }, { status: 404 });
  }

  await prisma.faq.delete({ where: { id: requestedId } });

  return NextResponse.json({});
}
