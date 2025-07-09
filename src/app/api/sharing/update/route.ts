import prisma from '@/lib/prisma';
import { uploadSharedResume } from '@/lib/shareUtils';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * PUT: Update an existing shared resume with a new PDF
 */
export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, shareId, pdfDataUrl, resumeId } = body;

    if (!title || !shareId || !pdfDataUrl || !resumeId) {
      return NextResponse.json(
        { error: 'Missing required fields: title,  shareId, pdfDataUrl, or resumeId' },
        { status: 400 }
      );
    }

    // Check if resume exists and is paid
    const resume = await prisma.resume.findUnique({
      where: { slug: resumeId },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    if (!resume.hasPaid) {
      return NextResponse.json({ error: 'Only paid resumes can be shared' }, { status: 403 });
    }

    // Find existing shared resume
    const existingSharedResume = await prisma.sharedResume.findUnique({
      where: { shareId },
    });

    if (!existingSharedResume) {
      return NextResponse.json({ error: 'Shared resume not found' }, { status: 404 });
    }

    // Convert base64 data URL to buffer
    const base64Data = pdfDataUrl.split(';base64,').pop();
    const buffer = Buffer.from(base64Data || '', 'base64');

    // Upload PDF to S3 with the same name to replace the old one
    const pdfUrl = await uploadSharedResume(buffer, shareId);

    // Add cache busting parameter to URL
    const timestamp = Date.now();
    const cacheBustedUrl = `${pdfUrl}?v=${timestamp}`;

    // Update shared resume record
    const updatedSharedResume = await prisma.sharedResume.update({
      where: { shareId },
      data: {
        resumeTitle: title,
        pdfUrl: cacheBustedUrl,
      },
    });

    return NextResponse.json({
      success: true,
      sharedResume: updatedSharedResume,
    });
  } catch (error) {
    console.error('Error updating shareable resume:', error);
    return NextResponse.json({ error: 'Failed to update shareable resume' }, { status: 500 });
  }
}
