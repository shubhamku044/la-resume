import imagekit from '@/lib/imagekit';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

/**
 * POST: Create a shareable resume link
 * Requirements:
 * 1. Resume must be paid
 * 2. Generate a PDF and upload to ImageKit
 * 3. Create a shareable link record in the database
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { resumeId, pdfDataUrl, authorName } = body;

    if (!resumeId || !pdfDataUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: resumeId or pdfDataUrl' },
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
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate unique ID for the shared resume
    const shareId = uuidv4();

    // Upload PDF to ImageKit
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `${shareId}.pdf`,
      folder: '/shared-resumes',
      useUniqueFileName: false,
    });

    // Create shared resume record
    const sharedResume = await prisma.$transaction(async (tx) => {
      // Run prisma generate to update the schema before deployment
      return tx.sharedResume.create({
        data: {
          shareId,
          resumeId,
          pdfUrl: uploadResponse.url,
          authorName,
          viewCount: 0,
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
