import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST: Increment the view count for a shared resume
 * This endpoint is only called once per session per browser
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ shareId?: string }> }
) {
  try {
    const { shareId } = await params;

    if (!shareId) {
      return NextResponse.json({ error: 'Share ID is required' }, { status: 400 });
    }

    // Increment the view count
    await prisma.sharedResume.update({
      where: { shareId },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      message: 'View count incremented',
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 });
  }
}
