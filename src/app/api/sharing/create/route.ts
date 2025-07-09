import prisma from '@/lib/prisma';
import { uploadSharedResume } from '@/lib/shareUtils';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST: Create a shareable resume link
 * Requirements:
 * 1. Resume must be paid
 * 2. Generate a PDF and upload to Amazon S3
 * 3. Create a shareable link record in the database
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, resumeId, pdfDataUrl, authorName, clerkId } = body;

    if (!title || !resumeId || !pdfDataUrl || !authorName || !clerkId) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: title or resumeId or pdfDataUrl or authorName or clerkId',
        },
        { status: 400 }
      );
    }

    // Check if resume exists and is paid
    const resume = await prisma.resume.findUnique({
      where: {
        slug: resumeId,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    if (!resume.hasPaid) {
      return NextResponse.json({ error: 'Only paid resumes can be shared' }, { status: 403 });
    }

    // Convert base64 data URL to buffer
    const base64Data = pdfDataUrl.split(';base64,').pop();
    const buffer = Buffer.from(base64Data || '', 'base64');

    // Generate unique ID for the shared resume
    const shareId = resumeId;

    // Upload PDF to S3 and get the URL
    const pdfUrl = await uploadSharedResume(buffer, shareId);

    // Create shared resume record
    const sharedResume = await prisma.$transaction(async (tx) => {
      return tx.sharedResume.create({
        data: {
          resumeTitle: title,
          shareId,
          resumeId,
          pdfUrl,
          authorName,
          viewCount: 0,
          userId: clerkId,
        },
      });
    });

    return NextResponse.json({
      success: true,
      sharedResume,
    });
  } catch (error) {
    console.error('Error creating shareable resume:', error);
    return NextResponse.json({ error: `Failed to create shareable resume` }, { status: 500 });
  }
}
