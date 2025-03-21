import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
  }

  try {
    const resume = await prisma.resume.findUnique({ where: { slug } });

    if (!resume) {
      return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
    }

    await prisma.resume.update({
      where: { slug },
      data: { hasPaid: true },
    });

    return NextResponse.json({ message: 'Payment confirmed, hasPaid updated.' }, { status: 200 });
  } catch (err) {
    console.error('Error updating payment:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
