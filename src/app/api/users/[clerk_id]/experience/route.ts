import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ clerk_id: string }> }) {
  const { clerk_id } = await params;

  if (!clerk_id) {
    return NextResponse.json({ error: 'Invalid clerk_id' }, { status: 400 });
  }

  try {
    const experience = await prisma.experience.findMany({
      where: { id: clerk_id },
    });
    return NextResponse.json(experience, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ clerk_id: string }> }
) {
  const { clerk_id } = await params;

  const data = await req.json();

  const { ...experience } = data;

  if (!clerk_id) {
    return NextResponse.json({ error: 'Missing clerk_id parameter' }, { status: 400 });
  }

  try {
    const updatedExperience = await prisma.experience.upsert({
      where: { id: clerk_id },
      update: {
        ...experience,
        start_date: new Date(experience?.start_date),
        end_date: new Date(experience?.end_date),
      },
      create: {
        id: clerk_id,
        ...experience,
        start_date: new Date(experience?.start_date),
        end_date: new Date(experience?.end_date),
      },
    });
    return NextResponse.json(updatedExperience, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}
