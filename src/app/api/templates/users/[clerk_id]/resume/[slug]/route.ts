import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug' },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    // Fetch the resume by slug
    const resume = await prisma.resume.findUnique({
      where: { slug: slug as string },
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404, headers: NO_CACHE_HEADERS }
      );
    }

    return new Response(JSON.stringify(resume), {
      status: 200,
      headers: { ...NO_CACHE_HEADERS, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ GET Resume by Slug Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ clerk_id: string; slug: string }> }
) {
  try {
    const { clerk_id, slug } = await params;

    if (!clerk_id || !slug) {
      return NextResponse.json(
        { error: 'Missing clerk_id or slug' },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    const deletedResume = await prisma.resume.delete({
      where: { userId: clerk_id, slug },
    });

    if (!deletedResume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404, headers: NO_CACHE_HEADERS }
      );
    }

    return new Response(JSON.stringify({ message: 'Resume deleted successfully' }), {
      status: 200,
      headers: NO_CACHE_HEADERS,
    });
  } catch (error) {
    console.error('❌ DELETE Resume Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ clerk_id: string; slug: string }> }
) {
  try {
    const { clerk_id, slug } = await params;

    // Validate clerk_id and slug
    if (!clerk_id || !slug) {
      return NextResponse.json(
        { error: 'Missing clerk_id or slug' },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { title, type, data, previewUrl } = body;
    const hasPaid = false;
    const orderNumber = '';

    // Validate required fields
    if (!title || !type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    // Upsert the resume in the database
    const updatedResume = await prisma.resume.upsert({
      where: { slug, userId: clerk_id },
      update: { title, type, data, previewUrl }, // Update previewUrl
      create: { slug, userId: clerk_id, title, type, data, previewUrl, hasPaid, orderNumber }, // Include previewUrl
    });

    // Return success response
    return NextResponse.json(
      { message: 'Resume saved successfully', updatedResume },
      { status: 200, headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error('❌ PUT Resume Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
