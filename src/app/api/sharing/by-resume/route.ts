import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET: Retrieve a shared resume information by its resumeId
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const resumeId = searchParams.get('resumeId');

    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }

    // Find shared resume by resumeId
    const sharedResume = await prisma.sharedResume.findFirst({
      where: { resumeId },
    });

    if (!sharedResume) {
      return NextResponse.json(
        {
          success: false,
          message: 'No shared resume found for this resume ID',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: sharedResume,
    });
  } catch (error) {
    console.error('Error fetching shared resume by resumeId:', error);
    return NextResponse.json({ error: 'Failed to fetch shared resume' }, { status: 500 });
  }
}
