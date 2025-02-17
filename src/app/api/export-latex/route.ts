import { NextRequest, NextResponse } from 'next/server';
import { generateLatex } from '@/lib/utils';
import { ResumeData } from '@/types/resume';

export async function POST(req: NextRequest) {
  try {
    const resumeData: ResumeData = await req.json();

    const latexTemplate = generateLatex(resumeData);

    return new NextResponse(latexTemplate, {
      headers: {
        'Content-Type': 'application/x-latex',
        'Content-Disposition': 'attachment; filename="resume.tex"',
      },
    });
  } catch (err) {
    console.log('Failed to generate LaTeX:', err);
    return NextResponse.json({ error: 'Failed to generate LaTeX' }, { status: 500 });
  }
}
