import prisma from '@/lib/prisma';
import { deleteSharedResume } from '@/lib/shareUtils';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET: Retrieve a shared resume by its shareId
 * Optionally increments view count based on countView query param
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const { userId } = await auth();
    const { shareId } = await params;
    const url = new URL(request.url);
    const shouldCountView = url.searchParams.get('countView') === 'true';

    if (!shareId) {
      return NextResponse.json({ error: 'Share ID is required' }, { status: 400 });
    }

    const sharedResume = await prisma.sharedResume.findUnique({
      where: { shareId },
    });

    // If we should count this view, increment the view count
    if (shouldCountView && sharedResume?.userId !== userId) {
      await prisma.sharedResume.update({
        where: { shareId },
        data: { viewCount: { increment: 1 } },
      });
    }

    if (!sharedResume) {
      return NextResponse.json({ error: 'Shared resume not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: sharedResume,
    });
  } catch (error) {
    console.error('Error fetching shared resume:', error);
    return NextResponse.json({ error: 'Failed to fetch shared resume' }, { status: 500 });
  }
}

/**
 * DELETE: Delete shared resume when a resume is deleted
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { shareId } = await params;
    if (!shareId) {
      return NextResponse.json({ error: 'Share ID is required' }, { status: 400 });
    }

    // Find the shared resume
    const sharedResume = await prisma.sharedResume.findFirst({
      where: { shareId },
    });

    if (!sharedResume) {
      return NextResponse.json(
        { message: 'No shared resume found for this share ID' },
        { status: 404 }
      );
    }

    // Delete the shared resume record
    await prisma.sharedResume.delete({
      where: { shareId: sharedResume.shareId },
    });

    // Delete the PDF from S3
    try {
      await deleteSharedResume(sharedResume.shareId);
    } catch (deleteError) {
      console.error('Error deleting file from S3:', deleteError);
      // We continue even if file deletion fails
    }

    return NextResponse.json({
      success: true,
      message: 'Shared resume deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting shared resume:', error);
    return NextResponse.json({ error: 'Failed to delete shared resume' }, { status: 500 });
  }
}
