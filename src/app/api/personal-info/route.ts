import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerk_id = searchParams.get('clerk_id');

  if (!clerk_id) {
    return NextResponse.json({ error: 'Invalid clerk_id' }, { status: 400 });
  }

  try {
    const personalInfo = await prisma.personalInfo.findUnique({
      where: { id: clerk_id },
    });
    return NextResponse.json(personalInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { clerk_id, ...personalInfo } = data;

  try {
    const updatedPersonalInfo = await prisma.personalInfo.upsert({
      where: { id: clerk_id },
      update: {
        ...personalInfo,
        dob: new Date(personalInfo?.dob),
      },
      create: {
        id: clerk_id,
        ...personalInfo,
        dob: new Date(personalInfo?.dob),
      },
    });
    return NextResponse.json(updatedPersonalInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}
