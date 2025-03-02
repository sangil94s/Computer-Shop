import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

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
	  const newFaq = await prisma.faq.create({
		data: {
		  category: body.category,
		  title: body.title,
		  description: body.description,
		},
	  });
	  return NextResponse.json(newFaq);
	} catch (e) {
	  console.error(e);
	  return NextResponse.json({ message: 'fail' }, { status: 500 });
	}
  }
  