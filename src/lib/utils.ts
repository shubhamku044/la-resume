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

export const generateSlug = (title: string): string => {
  const randomString = Math.random().toString(36).substring(2, 8); // Random string
  const timestamp = Date.now(); // Timestamp
  return `${title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}-${randomString}`;
};

export async function getImagekitFileId(fileId: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}/details`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString('base64')}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ImageKit file details. Status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.fileId; // Returns the file details
  } catch (error) {
    console.error('Error fetching ImageKit file details:', error);
    return null;
  }
}

export async function deleteImagekitFile(fileId: string): Promise<boolean> {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    console.error('❌ IMAGEKIT_PRIVATE_KEY is missing');
    return false;
  }

  const encodedAuth = Buffer.from(`${privateKey}:`).toString('base64');

  try {
    const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
    });

    if (!response.ok) {
      console.error('❌ Failed to delete ImageKit file:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ Error deleting ImageKit file:', error);
    return false;
  }
}
