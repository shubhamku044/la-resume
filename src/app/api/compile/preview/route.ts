import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import config from '@/utils/config';

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

    const response = await fetch(`${config.API_URL}/compile/preview`, {
      method: 'POST',
      body: backendFormData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to compile LaTeX preview');
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
