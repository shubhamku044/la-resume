import { ResumeData } from '@/types/resume';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateLatex = (data: ResumeData): string => {
  return `
  \\documentclass{article}
  \\usepackage{hyperref}
  \\begin{document}

  \\section*{${data.name}}
  \\textbf{Email:} \\href{mailto:${data.email}}{${data.email}} \\newline
  \\textbf{Phone:} ${data.phone} \\newline

  \\section*{Experience}
  ${data.experience
    .map((exp) => `\\textbf{${exp.position} at ${exp.company}} (${exp.duration})`)
    .join('\n')}

  \\section*{Education}
  ${data.education
    .map((edu) => `\\textbf{${edu.degree}, ${edu.institution}} (${edu.year})`)
    .join('\n')}

  \\section*{Skills}
  ${data.skills.join(', ')}

  \\end{document}
  `;
};
