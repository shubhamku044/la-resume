import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface StatsResponse {
  signups: number;
  resumes: number;
}

export async function GET() {
  const currentStats: StatsResponse = {
    signups: 584,
    resumes: 612,
  };
  try {
    const totalSignups = await prisma.user.count();
    const totalResumes = await prisma.resume.count();

    const resp: StatsResponse = {
      signups: totalSignups,
      resumes: totalResumes,
    };

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error('Error fetching responses', error);
    return NextResponse.json(currentStats, { status: 500 });
  }
}
