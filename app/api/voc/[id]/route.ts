import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const requestedId = parseInt(params.id);

  const voc = await prisma.vocs.findUnique({
    where: { id: requestedId },
  });

  if (!voc) {
    return NextResponse.json({ error: 'VOC NOT FOUND' }, { status: 404 });
  }

  await prisma.vocs.delete({ where: { id: requestedId } });

  return NextResponse.json({});
}
