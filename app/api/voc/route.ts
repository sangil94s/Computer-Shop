// 아마도 추가 와 삭제 , 조회만 배치
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const VocSchema = z.object({
  category: z.string().min(2, '카테고리는 최소 2글자 이상이어야 합니다.'),
  title: z.string().min(3, '제목은 최소 3글자 이상이어야 합니다.'),
  description: z.string().min(3, '설명은 최소 3글자 이상이어야 합니다.'),
});
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
    const parsed = VocSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: '유효하지 않은 데이터입니다.', errors: parsed.error.format() },
        { status: 400 },
      );
    }

    const newVoc = await prisma.vocs.create({
      data: parsed.data,
    });
    return NextResponse.json(newVoc);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}
