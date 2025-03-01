import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await prisma.vocs.count();
    return Response.json({ data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}
