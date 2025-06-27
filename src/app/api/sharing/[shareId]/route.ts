import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

import imagekit from '@/lib/imagekit';
import { auth } from '@clerk/nextjs/server';

/**
 * GET: Retrieve a shared resume by its shareId
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const { shareId } = await params;

    if (!shareId) {
      return NextResponse.json({ error: 'Share ID is required' }, { status: 400 });
    }

    // Find the shared resume without incrementing view count
    // (view count is now handled by a separate endpoint)
    const sharedResume = await prisma.sharedResume.findUnique({
      where: { shareId },
    });

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
export async function DELETE(request: NextRequest, { params }: { params: { shareId: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { shareId } = params;
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

    // Delete the PDF from ImageKit
    try {
      // Extract the file ID from the URL or get it from ImageKit API
      // This assumes you have the fileId stored or can extract it
      const fileId = `${sharedResume.shareId}.pdf`;
      await imagekit.deleteFile(fileId);
    } catch (deleteError) {
      console.error('Error deleting file from ImageKit:', deleteError);
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
