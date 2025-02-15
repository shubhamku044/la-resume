import { NextRequest, NextResponse } from 'next/server';
import { generateLatex } from '@/lib/utils';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ResumeData } from '@/types/resume';

export async function POST(req: NextRequest) {
  try {
    const resumeData: ResumeData = await req.json();
    const latexTemplate = generateLatex(resumeData);

    const latexPath = path.join('/tmp', 'resume.tex');
    const pdfPath = path.join('/tmp', 'resume.pdf');

    fs.writeFile(latexPath, latexTemplate, { encoding: 'utf8' }, (err) => {
      if (err) {
        console.log('Failed to write LaTeX template:', err);
        throw err;
      }
    });

    await new Promise((resolve, reject) => {
      exec(`pdflatex -output-directory=/tmp ${latexPath}`, (err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });

    const pdfBuffer = await fs.readFileSync(pdfPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (err) {
    console.log('Failed to generate LaTeX:', err);
    return NextResponse.json({ error: 'Failed to generate LaTeX', message: err }, { status: 500 });
  }
}
