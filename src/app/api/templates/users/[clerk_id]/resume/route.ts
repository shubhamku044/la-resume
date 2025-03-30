import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this is correctly set up

export async function GET(req: Request, { params }: { params: Promise<{ clerk_id?: string }> }) {
  try {
    const { clerk_id } = await params;

    // Validate clerk_id
    if (!clerk_id) {
      return NextResponse.json({ error: 'clerk_id is required' }, { status: 400 });
    }

    // Fetch all resumes associated with the given clerk_id
    const resumes = await prisma.resume.findMany({
      where: { userId: clerk_id },
      select: {
        id: true,
        slug: true,
        title: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        data: true,
        previewUrl: true,
        hasPaid: true,
        orderNumber: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
    // Return an empty array instead of a 404 if no resumes exist
    return new Response(JSON.stringify(resumes), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
}
