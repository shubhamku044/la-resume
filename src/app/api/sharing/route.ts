import prisma from '@/lib/prisma';
import { uploadSharedResume } from '@/lib/shareUtils';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

/**
 * POST: Create a new shared resume
 *
 * Expected request body:
 * {
 *   resumeId: string; // ID of the resume to share
 *   pdfBuffer: string; // Base64-encoded PDF buffer
 *   authorName: string; // Name of the author
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { resumeId, pdfBuffer, authorName } = body;

    // Validate required fields
    if (!resumeId || !pdfBuffer || !authorName) {
      return NextResponse.json(
        { error: 'Resume ID, PDF buffer, and author name are required' },
        { status: 400 }
      );
    }

    // Generate a unique share ID
    const shareId = uuidv4();

    // Convert base64 PDF to buffer
    const fileBuffer = Buffer.from(
      pdfBuffer.replace(/^data:application\/pdf;base64,/, ''),
      'base64'
    );

    // Upload the PDF to S3 and get the URL
    const pdfUrl = await uploadSharedResume(fileBuffer, shareId);

    // Create a new shared resume record in the database
    const sharedResume = await prisma.sharedResume.create({
      data: {
        shareId,
        resumeId,
        pdfUrl,
        authorName,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: sharedResume,
    });
  } catch (error) {
    console.error('Error creating shared resume:', error);
    return NextResponse.json({ error: 'Failed to create shared resume' }, { status: 500 });
  }
}

/**
 * GET: List all shared resumes for the authenticated user
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all shared resumes for the authenticated user
    const sharedResumes = await prisma.sharedResume.findMany({
      where: { userId },
      orderBy: { lastUpdated: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: sharedResumes,
    });
  } catch (error) {
    console.error('Error fetching shared resumes:', error);
    return NextResponse.json({ error: 'Failed to fetch shared resumes' }, { status: 500 });
  }
}
