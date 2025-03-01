import { ResumeData } from '@/types/resume';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const escapeLatex = (text: string) => {
  return text
    .replace(/\\/g, '\\textbackslash{}') // Backslash
    .replace(/_/g, '\\_') // Underscore
    .replace(/{/g, '\\{') // Left brace
    .replace(/}/g, '\\}') // Right brace
    .replace(/\$/g, '\\$') // Dollar sign
    .replace(/%/g, '\\%') // Percent sign
    .replace(/#/g, '\\#') // Hash
    .replace(/&/g, '\\&') // Ampersand
    .replace(/\^/g, '\\^{}') // Caret (superscript)
    .replace(/~/g, '\\textasciitilde{}') // Tilde (non-breaking space)
    .replace(/`/g, '\\textasciigrave{}') // Backtick
    .replace(/"/g, '``') // Double quote (LaTeX uses `` and '')
    .replace(/'/g, "''"); // Single quote (LaTeX prefers '' for closing quotes)
};

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
