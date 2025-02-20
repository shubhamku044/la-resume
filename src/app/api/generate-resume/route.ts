import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const latexFile = formData.get('latex');

    if (!latexFile || !(latexFile instanceof Blob)) {
      return NextResponse.json({ error: 'Invalid LaTeX file' }, { status: 400 });
    }

    // TODO: Process LaTeX file (convert to WebP using external API or LaTeX compiler)
    // For now, returning a mock image URL
    const imageUrl = 'https://via.placeholder.com/300x400.webp';

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error processing resume:', error); // ✅ Now 'error' is used
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
