import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();

    if (!formData.has('latex')) {
      return NextResponse.json({ error: 'No LaTeX file provided' }, { status: 400 });
    }

    const latexFile = formData.get('latex') as Blob;

    const backendFormData = new FormData();
    backendFormData.append('latex', latexFile, 'resume.tex');

    const clerkAuth = await auth();
    const accessToken = await clerkAuth.getToken();

    const response = await fetch('http://3.107.202.62:8080/compile', {
      method: 'POST',
      body: backendFormData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to compile LaTeX file');
    }

    const webpBuffer = await response.arrayBuffer();

    return new NextResponse(webpBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Content-Disposition': `attachment; filename="resume-${Date.now()}.webp"`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
