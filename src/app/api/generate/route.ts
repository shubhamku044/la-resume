import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    if (!formData.has('latex')) {
      return NextResponse.json({ error: 'No LaTeX file provided' }, { status: 400 });
    }

    const latexFile = formData.get('latex') as Blob;

    const backendFormData = new FormData();
    backendFormData.append('latex', latexFile, 'resume.tex');

    const response = await fetch('http://3.107.202.62:8080/generate-pdf', {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
