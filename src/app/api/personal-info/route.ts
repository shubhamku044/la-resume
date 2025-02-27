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
      where: { userId: clerk_id },
    });
    console.log('personalInfo', personalInfo);
    return NextResponse.json(personalInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerk_id = searchParams.get('clerk_id');
  const data = await req.json();

  if (!clerk_id) {
    return NextResponse.json({ error: 'Invalid clerk_id' }, { status: 400 });
  }

  try {
    const updatedPersonalInfo = await prisma.personalInfo.upsert({
      where: { userId: clerk_id },
      update: data,
      create: { userId: clerk_id, ...data },
    });
    return NextResponse.json(updatedPersonalInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}