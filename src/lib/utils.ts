import { ResumeData } from '@/types/resume';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const escapeLatex = (text: string) => {
  let escaped = text
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

  const dangerousCommands = [
    '\\write',
    '\\read',
    '\\openin',
    '\\openout',
    '\\input',
    '\\include',
    '\\import',
    '\\usepackage',
    '\\documentclass',
    '\\lstinputlisting',
    '\\verbatiminput',
    '\\immediate',
    '\\newcommand',
    '\\renewcommand',
    '\\def',
    '\\let',
    '\\futurelet',
    '\\catcode',
    '\\makeatletter',
    '\\csname',
    '\\endcsname',
    '\\message',
    '\\special',
    '\\shell',
    '\\ShellEscape',
    '\\write18',
    '\\PassOptionsToPackage',
    '\\afterassignment',
    '\\expandafter',
  ];
  // Detect and neutralize dangerous commands
  dangerousCommands.forEach((command) => {
    const commandRegex = new RegExp(
      `\\\\textbackslash\\{\\}(${command.replace(/\\/g, '').trim()})`,
      'gi'
    );
    escaped = escaped.replace(commandRegex, `[BLOCKED:$1]`);

    // Also check for Unicode homoglyphs and other obfuscation techniques
    const obfuscatedRegex = new RegExp(
      `\\\\textbackslash\\{\\}\\s*(${command.replace(/\\/g, '').trim()})`,
      'gi'
    );
    escaped = escaped.replace(obfuscatedRegex, `[BLOCKED:$1]`);
  });

  // Block verbatim environments which could be used to bypass escaping
  escaped = escaped.replace(
    /\\begin\s*\{\s*(verbatim|lstlisting|minted|alltt)\s*\}/gi,
    '[BLOCKED:VERBATIM]'
  );

  // Block math environments which could be used for injection
  const mathEnvironments = ['equation', 'align', 'displaymath', 'math', 'eqnarray'];
  mathEnvironments.forEach((env) => {
    const envRegex = new RegExp(`\\\\begin\\s*\\{\\s*${env}\\s*\\}`, 'gi');
    escaped = escaped.replace(envRegex, `[SANITIZED:${env}]`);
  });

  // Block attempts to use comments for injection
  // escaped = escaped.replace(/\\%\s*(.+)$/gm, '\\% [SANITIZED]');
  escaped = escaped.replace(/\\%\s*(\\[a-zA-Z]+)/gm, '\\% [BLOCKED:$1]');

  // Block attempts to use newlines and spaces to obfuscate commands
  escaped = escaped.replace(/\\textbackslash\{\}\s+([a-zA-Z]+)/g, (match, command) => {
    if (dangerousCommands.some((dc) => dc.includes(command))) {
      return `[BLOCKED:${command}]`;
    }
    return match;
  });

  // Block attempts to create new commands
  escaped = escaped.replace(
    /\\textbackslash\{\}(new|renew|provide)[a-zA-Z]*/gi,
    '[BLOCKED:COMMAND-DEFINITION]'
  );

  // Block attempts to use TeX primitives for injection
  const texPrimitives = [
    'atop',
    'above',
    'over',
    'mathchoice',
    'discretionary',
    'loop',
    'repeat',
    'unless',
    'ifx',
    'ifnum',
  ];
  texPrimitives.forEach((primitive) => {
    const primitiveRegex = new RegExp(`\\\\textbackslash\\{\\}${primitive}`, 'gi');
    escaped = escaped.replace(primitiveRegex, `[BLOCKED:${primitive}]`);
  });

  return escaped;
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

export const getCurrencyAndAmountByRegion = (countryCode: string) => {
  const regionPricing: Record<string, { currency: string; amount: number }> = {
    IN: { currency: 'INR', amount: 2000 },
    US: { currency: 'USD', amount: 50 },
    GB: { currency: 'GBP', amount: 40 },
    CA: { currency: 'CAD', amount: 60 },
    AU: { currency: 'AUD', amount: 70 },
  };

  return regionPricing[countryCode] || regionPricing['IN'];
};
