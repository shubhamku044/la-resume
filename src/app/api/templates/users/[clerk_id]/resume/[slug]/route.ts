import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    // Fetch the resume by slug
    const resume = await prisma.resume.findUnique({
      where: { slug: slug as string },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json(resume, { status: 200 });
  } catch (error) {
    console.error('❌ GET Resume by Slug Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ clerk_id: string; slug: string }> }
) {
  try {
    // ✅ Extract params
    const { clerk_id, slug } = await params;

    if (!clerk_id || !slug) {
      return NextResponse.json({ error: 'Missing clerk_id or slug' }, { status: 400 });
    }

    // ✅ Parse request body
    const body = await req.json();
    const { title, type, data } = body;

    if (!title || !type || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Upsert (Create if Not Found)
    const updatedResume = await prisma.resume.upsert({
      where: { slug, userId: clerk_id },
      update: { title, type, data }, // Update if found
      create: { slug, userId: clerk_id, title, type, data }, // Create if not found
    });

    return NextResponse.json(
      { message: 'Resume saved successfully', updatedResume },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ PUT Resume Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 }
    );
  }
}
