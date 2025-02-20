import { escapeLatex } from '../utils';

export type ClassicResumeData = {
  heading: {
    name: string;
    phone?: string;
    email?: string;
    portfolio?: string;
    github?: string;
    linkedin?: string;
    leetcode?: string;
    codeforces?: string;
    location?: string;
  };
  education: {
    institution: string;
    location: string;
    degree: string;
    duration: {
      from: string;
      to: string;
    };
    cgpa?: string;
    percentage?: string;
  }[];
  skills: Record<string, string[]>;
  experience: {
    title: string;
    date: string;
    accomplishments: string[];
  }[];
  projects: {
    title: string;
    url: string;
    urlLabel: string;
    accomplishments: string[];
  }[];
  honorsAndAwards: {
    description: string;
    url?: string;
    urlLabel?: string;
  }[];
};

export const classic = (data: ClassicResumeData) => {
  const contactItems: string[] = [];
  if (data.heading.phone) contactItems.push(escapeLatex(data.heading.phone));
  if (data.heading.email)
    contactItems.push(
      `\\href{mailto:${escapeLatex(data.heading.email)}}{\\textbf{${escapeLatex(data.heading.email)}}}`
    );
  if (data.heading.portfolio)
    contactItems.push(`\\href{${escapeLatex(data.heading.portfolio)}}{\\textbf{Portfolio}}`);
  if (data.heading.github)
    contactItems.push(`\\href{${escapeLatex(data.heading.github)}}{\\textbf{Github}}`);
  if (data.heading.linkedin)
    contactItems.push(`\\href{${escapeLatex(data.heading.linkedin)}}{\\textbf{LinkedIn}}`);
  if (data.heading.leetcode)
    contactItems.push(`\\href{${escapeLatex(data.heading.leetcode)}}{\\textbf{LeetCode}}`);
  if (data.heading.codeforces)
    contactItems.push(`\\href{${escapeLatex(data.heading.codeforces)}}{\\textbf{Codeforces}}`);

  const contactLine = contactItems.length > 0 ? `\\small ${contactItems.join(' $|$ ')}` : '';
  return `
\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-5pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-5pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-10pt} % Adjust the value as needed
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-1pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
        \\textbf{\\Huge \\scshape ${escapeLatex(data.heading.name)}} \\\\
        \\vspace{1pt}
        ${contactLine ? `${contactLine} \\\\` : ''}
        ${data.heading.location ? `\\small ${escapeLatex(data.heading.location)}` : ''}
    }}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${data.education
  .map(({ institution, location, degree, duration, ...others }) => {
    return `
    \\resumeSubheading
      {${institution}}{${location}}
      {${degree}; ${others.cgpa ? `CGPA: ${others.cgpa}` : `Percentage: ${others.percentage}\\%`}}{${duration.from} -- ${duration.to}}
`;
  })
  .join('')}
  \\resumeSubHeadingListEnd

%-----------SKILLS-----------
\\section{Technical Skills}
\\resumeSubHeadingListStart
    \\resumeItemListStart
${Object.entries(data.skills)
  .map(([category, items]) => {
    return `\\resumeItem{\\textbf{${category.charAt(0).toUpperCase() + category.slice(1)}}: ${items.join(', ')}}`;
  })
  .join('\n        ')}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\\section{Experience}
${data.experience
  .map(
    ({ title, date, accomplishments }) => `
\\resumeSubHeadingListStart
    \\resumeProjectHeading
    {\\textbf{${title}}}{${date}}
    \\resumeItemListStart
        ${accomplishments.map((item) => `\\resumeItem{${escapeLatex(item)}}`).join('\n        ')}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
`
  )
  .join('\n')}

%-----------PROJECTS-----------
\\section{Projects}
${data.projects
  .map(
    ({ title, url, urlLabel, accomplishments }) => `
\\resumeSubHeadingListStart
    \\resumeProjectHeading
        {\\textbf{${escapeLatex(title)}}}{\\href{${escapeLatex(url)}}{${escapeLatex(urlLabel)}}}
    \\resumeItemListStart
        ${accomplishments.map((item) => `\\resumeItem{${escapeLatex(item)}}`).join('\n        ')}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
`
  )
  .join('\n')}

%-----------HONORS & AWARDS-----------
\\section{Honors & Awards}
\\resumeSubHeadingListStart
${data.honorsAndAwards
  .map(({ description, url, urlLabel }) => {
    const escapedDescription = escapeLatex(description);
    const urlText = url
      ? `\\hfill \\href{${escapeLatex(url)}}{\\underline{${escapeLatex(urlLabel || 'Link')}}}`
      : '';
    return `\\resumeItem{${escapedDescription}${urlText}}`;
  })
  .join('\n    ')}
\\resumeSubHeadingListEnd

\\end{document}
`;
};
