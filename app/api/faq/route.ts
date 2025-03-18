import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const faqSchema = z.object({
  category: z.string().min(2, '카테고리는 최소 2글자 이상이어야 합니다.'),
  title: z.string().min(3, '제목은 최소 3글자 이상이어야 합니다.'),
  description: z.string().min(15, '설명은 최소 15글자 이상이어야 합니다.'),
});

export async function GET() {
  try {
    const data = await prisma.faq.findMany();
    return Response.json({ data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = faqSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: '유효하지 않은 데이터입니다.', errors: parsed.error.format() },
        { status: 400 },
      );
    }

    const newFaq = await prisma.faq.create({
      data: parsed.data,
    });
    return NextResponse.json(newFaq);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 500 });
  }
}
