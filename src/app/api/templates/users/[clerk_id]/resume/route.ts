import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this is correctly set up

export async function GET(req: Request, { params }: { params: Promise<{ clerk_id?: string }> }) {
  try {
    const { clerk_id } = await params;

    // Validate clerk_id
    if (!clerk_id) {
      return NextResponse.json({ error: 'clerk_id is required' }, { status: 400 });
    }

    console.log('Fetching resumes for clerk_id:', clerk_id);

    // Fetch all resumes associated with the given clerk_id
    const resumes = await prisma.resume.findMany({
      where: { userId: clerk_id },
      select: { id: true, slug: true, title: true, type: true, createdAt: true },
    });

    // Return an empty array instead of a 404 if no resumes exist
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
