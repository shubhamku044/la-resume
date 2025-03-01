import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ clerk_id: string }> }) {
  const { clerk_id } = await params;

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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ clerk_id: string }> }
) {
  const { clerk_id } = await params;

  const data = await req.json();

  const { ...personalInfo } = data;

  if (!clerk_id) {
    return NextResponse.json({ error: 'Missing clerk_id parameter' }, { status: 400 });
  }

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
