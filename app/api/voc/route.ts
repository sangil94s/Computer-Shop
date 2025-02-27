// 아마도 추가 와 삭제 , 조회만 배치
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await prisma.vocs.findMany();
    return Response.json({ data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
} // 아마도 관리자 전용 - 추후 사용 예정

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newVoc = await prisma.vocs.create({
      data: {
        category: body.category,
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newVoc);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}
