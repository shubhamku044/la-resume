import { escapeLatex } from '../utils';

export type deedyResumeData = {
  personalInfo: {
    name: string;
    course: string;
    department: string;
    college: string;
    phone: string;
    email: string;
    social1: string;
    social2: string;
  };
  education: {
    id: string;
    degree: string;
    institute: string;
    cgpa: string;
    year: string;
  }[];
  experience: {
    id: string;
    company: string;
    location: string;
    role: string;
    duration: string;
    achievements: string[];
    website?: string;
  }[];
  projects: {
    id: string;
    title: string;
    tools: string[];
    duration: string;
    link: string;
    highlights: string[];
  }[];
  skills: Record<string, string[]>;
  certifications: {
    id: string;
    name: string;
    issuingOrganization: string;
    link?: string;
    date: string;
  }[];
  achievements: {
    id: string;
    title: string;
    link?: string;
  }[];
  positionsOfResponsibility: {
    id: string;
    title: string;
    organization: string;
    duration: string;
  }[];
};

export const deedySampleResumeData: deedyResumeData = {
  personalInfo: {
    name: 'John Doe',
    course: 'Bachelor of Technology',
    department: 'Computer Science and Engineering',
    college: 'XYZ University',
    phone: '+1 234 567 8901',
    email: 'johndoe@example.com',
    social1: 'github.com/johndoe',
    social2: 'linkedin.com/in/johndoe',
  },
  education: [
    {
      id: '936fd3be-9adb-45cb-ae44-2c1d83a76592',
      degree: 'B.Tech in Computer Science',
      institute: 'XYZ University',
      cgpa: '8.9/10',
      year: '2021 - 2025',
    },
    {
      id: '6132f86e-9864-41c0-8e7b-9a8cacf81d38',
      degree: 'High School',
      institute: 'ABC Senior Secondary School',
      cgpa: '9.2/10',
      year: '2019 - 2021',
    },
  ],
  experience: [
    {
      id: 'c07c8b80-2878-45d8-b0d2-a284e04c8e6c',
      company: 'Google',
      location: 'California, USA',
      role: 'Software Engineering Intern',
      duration: 'May 2024 - Aug 2024',
      achievements: [
        'Developed an internal tool that improved data processing efficiency by 30%.',
        'Collaborated with a team of 5 engineers to implement a machine learning model.',
      ],
      website: 'https://google.com',
    },
    {
      id: '8b509c8b-212c-4296-af49-8245220b3675',
      company: 'OpenAI',
      location: 'Remote',
      role: 'Research Intern',
      duration: 'Jan 2024 - Apr 2024',
      achievements: [
        'Worked on NLP models improving response accuracy by 20%.',
        'Published a research paper on LLM fine-tuning strategies.',
      ],
      website: 'https://openai.com',
    },
  ],
  projects: [
    {
      id: '5d9cfe99-3a92-4261-8f0a-69a8cb747b03',
      title: 'Resume Builder',
      tools: ['Next.js', 'TypeScript', 'TailwindCSS'],
      duration: 'Feb 2025 - Present',
      link: 'https://github.com/johndoe/resume-builder',
      highlights: [
        'Developed a dynamic resume builder with LaTeX export support.',
        'Implemented user authentication and data persistence using Firebase.',
      ],
    },
    {
      id: 'b43aa000-23c5-4fcb-94c0-b57e793581db',
      title: 'E-commerce Website',
      tools: ['React', 'Node.js', 'MongoDB'],
      duration: 'Sep 2024 - Dec 2024',
      link: 'https://ecommerce.example.com',
      highlights: [
        'Built a full-stack e-commerce platform handling 1000+ transactions daily.',
        'Integrated Stripe for secure payments and optimized backend for scalability.',
      ],
    },
  ],
  skills: {
    Programming: ['JavaScript', 'TypeScript', 'Python', 'Golang', 'Solidity'],
    Frameworks: ['React', 'Next.js', 'Gin', 'Express'],
    Tools: ['Docker', 'Git', 'Postman', 'Firebase'],
  },
  certifications: [
    {
      id: '3b4ca476-a174-4972-9298-3bfb32fbcecd',
      name: 'AWS Certified Solutions Architect',
      issuingOrganization: 'Amazon Web Services',
      link: 'https://aws.com/certifications',
      date: 'March 2024',
    },
    {
      id: 'd5f381ba-fdd4-4ed7-a29b-3da6061b169d',
      name: 'Google Data Analytics Certificate',
      issuingOrganization: 'Google',
      link: 'https://coursera.org/google-data-analytics',
      date: 'July 2023',
    },
  ],
  achievements: [
    {
      id: 'ffc11162-d225-4b04-9b75-2b35752ef06f',
      title: 'Meta Hacker Cup 2024 - Round 2 Qualifier',
      link: 'https://hacker-cup.com',
    },
    {
      id: '3cc5ce97-e38f-4003-a71e-438b38c65e62',
      title: 'Leetcode Contest - Top 5%',
      link: 'https://leetcode.com',
    },
  ],
  positionsOfResponsibility: [
    {
      id: '9915a91f-d626-4683-898d-2ac8086597e2',
      title: 'Tech Lead',
      organization: 'Geekonix Student Club',
      duration: 'Aug 2023 - Present',
    },
    {
      id: 'c068ac24-ffea-43e5-b5fd-a84db2fdb490',
      title: 'Open Source Contributor',
      organization: 'GitHub',
      duration: '2022 - Present',
    },
  ],
};

export const deedy = (data: deedyResumeData) => {
  return `% 
% NIT Patna Resume Template v2.1
% Author: Pavan Kumar Dubasi
% NIT Patna - IMSc., Mathematics (2019-24)
% LinkedIn: https://www.linkedin.com/in/im-pavankumar/
% 


\\documentclass[a4paper,11pt]{article}

% Package imports
\\usepackage{latexsym}
\\usepackage{xcolor}
\\usepackage{float}
\\usepackage{ragged2e}
\\usepackage[empty]{fullpage}
\\usepackage{wrapfig}
\\usepackage{tabularx}
\\usepackage{titlesec}
\\usepackage{geometry}
\\usepackage{marvosym}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage{fancyhdr}
\\usepackage{multicol}
\\usepackage{graphicx}
\\usepackage{cfr-lm}
\\usepackage[T1]{fontenc}
\\usepackage{fontawesome5}
\\usepackage[hidelinks]{hyperref}
\\usepackage{microtype}
\\usepackage{tabularx} % Required for tables that stretch to page width
\\usepackage{array} % Required for vertical centering in tables
% Color definitions
\\definecolor{darkblue}{RGB}{0,0,139}

% Page layout
\\geometry{left=1.4cm, top=0.8cm, right=1.2cm, bottom=1cm}
\\setlength{\\multicolsep}{0pt} 
\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\setlength{\\footskip}{4.08pt}

% Hyperlink setup
\\hypersetup{
    colorlinks=true,
    linkcolor=darkblue,
    filecolor=darkblue,
    urlcolor=darkblue,
}

% Custom box settings
\\usepackage[most]{tcolorbox}
\\tcbset{
    frame code={},
    center title,
    left=0pt,
    right=0pt,
    top=0pt,
    bottom=0pt,
    colback=gray!20,
    colframe=white,
    width=\\dimexpr\\textwidth\\relax,
    enlarge left by=-2mm,
    boxsep=4pt,
    arc=0pt,outer arc=0pt,
}

% URL style
\\urlstyle{same}

% Text alignment
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Section formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-7pt}]

% Custom commands
\\newcommand{\\resumeItem}[2]{
  \\item{
    \\textbf{#1}{\\hspace{0.5mm}#2 \\vspace{-0.5mm}}
  }
}

\\newcommand{\\resumePOR}[3]{
\\vspace{0.5mm}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1}\\hspace{0.3mm}#2 & \\textit{\\small{#3}} 
    \\end{tabular*}
    \\vspace{-2mm}
}

\\newcommand{\\resumeSubheading}[4]{
\\vspace{0.5mm}\\item
    \\begin{tabular*}{0.98\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1} & \\textit{\\footnotesize{#4}} \\\\
        \\textit{\\footnotesize{#3}} &  \\footnotesize{#2}\\\\
    \\end{tabular*}
    \\vspace{-2.4mm}
}

\\newcommand{\\resumeProject}[4]{
\\vspace{0.5mm}\\item
    \\begin{tabular*}{0.98\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1} & \\textit{\\footnotesize{#3}} \\\\
        \\footnotesize{\\textit{#2}} & \\footnotesize{#4}
    \\end{tabular*}
    \\vspace{-2.4mm}
}

\\newcommand{\\resumeSubItem}[2]{\\resumeItem{#1}{#2}\\vspace{-4pt}}

\\renewcommand{\\labelitemi}{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand{\\labelitemii}{$\\vcenter{\\hbox{\\tiny$\\circ$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*,labelsep=1mm]}
\\newcommand{\\resumeHeadingSkillStart}{\\begin{itemize}[leftmargin=*,itemsep=1.7mm, rightmargin=2ex]}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=*,labelsep=1mm,itemsep=0.5mm]}

\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}\\vspace{2mm}}
\\newcommand{\\resumeHeadingSkillEnd}{\\end{itemize}\\vspace{-2mm}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-2mm}}
\\newcommand{\\cvsection}[1]{%
\\vspace{2mm}
\\begin{tcolorbox}
    \\textbf{\\large #1}
\\end{tcolorbox}
    \\vspace{-4mm}
}

\\newcolumntype{L}{>{\\raggedright\\arraybackslash}X}%
\\newcolumntype{R}{>{\\raggedleft\\arraybackslash}X}%
\\newcolumntype{C}{>{\\centering\\arraybackslash}X}%

% Commands for icon sizing and positioning
\\newcommand{\\socialicon}[1]{\\raisebox{-0.05em}{\\resizebox{!}{1em}{#1}}}
\\newcommand{\\ieeeicon}[1]{\\raisebox{-0.3em}{\\resizebox{!}{1.3em}{#1}}}

% Font options
\\newcommand{\\headerfonti}{\\fontfamily{phv}\\selectfont} % Helvetica-like (similar to Arial/Calibri)
\\newcommand{\\headerfontii}{\\fontfamily{ptm}\\selectfont} % Times-like (similar to Times New Roman)
\\newcommand{\\headerfontiii}{\\fontfamily{ppl}\\selectfont} % Palatino (elegant serif)
\\newcommand{\\headerfontiv}{\\fontfamily{pbk}\\selectfont} % Bookman (readable serif)
\\newcommand{\\headerfontv}{\\fontfamily{pag}\\selectfont} % Avant Garde-like (similar to Trebuchet MS)
\\newcommand{\\headerfontvi}{\\fontfamily{cmss}\\selectfont} % Computer Modern Sans Serif
\\newcommand{\\headerfontvii}{\\fontfamily{qhv}\\selectfont} % Quasi-Helvetica (another Arial/Calibri alternative)
\\newcommand{\\headerfontviii}{\\fontfamily{qpl}\\selectfont} % Quasi-Palatino (another elegant serif option)
\\newcommand{\\headerfontix}{\\fontfamily{qtm}\\selectfont} % Quasi-Times (another Times New Roman alternative)
\\newcommand{\\headerfontx}{\\fontfamily{bch}\\selectfont} % Charter (clean serif font)

%----------HEADING-----------------

% Define personal information
\\newcommand{\\name}{${escapeLatex(data.personalInfo.name)}} % Your Name
\\newcommand{\\course}{${escapeLatex(data.personalInfo.course)}} % Your Course
\\newcommand{\\roll}{${escapeLatex(data.personalInfo.department)}} % Your Roll No.
\\newcommand{\\phone}{${escapeLatex(data.personalInfo.phone)}} % Your Phone Number
\\newcommand{\\emailb}{${escapeLatex(data.personalInfo.email)}} % Email 2
\\newcommand{\\github}{${escapeLatex(data.personalInfo.social1)}} % Github
\\newcommand{\\website}{${escapeLatex(data.personalInfo.social2)}} % Website


\\begin{document}
\\fontfamily{cmr}\\selectfont



\\parbox{\\dimexpr\\linewidth\\relax}{
\\begin{tabularx}{\\linewidth}{L r}
  \\textbf{\\LARGE \\name} & \\phone \\\\
  \\course & \\href{mailto:\\emailb}{\\emailb} \\\\
  ${escapeLatex(data.personalInfo.department)} & \\href{\\github}{\\github} \\\\
  ${escapeLatex(data.personalInfo.college)}
  & \\href{\\website}{\\website} \\\\
\\end{tabularx}
}
\\vspace{-2mm}
%----------EDUCATION-----------------

${
  data.education.length > 0
    ? `
\\section{\\textbf{Education}}
\\vspace{1mm}
\\setlength{\\tabcolsep}{5pt}
\\begin{tabularx}{\\textwidth}{|>{\\centering\\arraybackslash}X|>{\\centering\\arraybackslash}p{8cm}|>{\\centering\\arraybackslash}p{3cm}|>{\\centering\\arraybackslash}p{2.5cm}|}
  \\hline
  \\textbf{Degree/Certificate} & \\textbf{Institute/Board} & \\textbf{CGPA/Percentage} & \\textbf{Year} \\\\
  \\hline

  ${data.education
    .map(({ degree, institute, cgpa, year }) => {
      return `${escapeLatex(degree)} & ${escapeLatex(institute)} & ${escapeLatex(cgpa)} & ${escapeLatex(year)} \\\\ \\hline`;
    })
    .join('\n')} 
  
\\end{tabularx}
\\vspace{-4mm}
`
    : ''
}


%----------EXPERIENCE-----------------

${
  data.experience.length > 0
    ? `
\\section{\\textbf{Experience}}
\\vspace{-0.4mm}
\\resumeSubHeadingListStart
${data.experience
  .map(({ company, website, location, role, duration, achievements }) => {
    return `
\\resumeSubheading
    {${escapeLatex(company)} [\\href{${website}}{\\faIcon{globe}}]}{${escapeLatex(location)}}
    {${escapeLatex(role)}}{${escapeLatex(duration)}}
    \\resumeItemListStart
      ${achievements.map((achievement) => `\\item ${escapeLatex(achievement)}`).join('\n      ')}
    \\resumeItemListEnd
`;
  })
  .join('')}

\\resumeSubHeadingListEnd
\\vspace{-6mm}
`
    : ''
}


%----------PROJECT-----------------


${
  data.projects.length > 0
    ? `
\\section{\\textbf{Projects}}
\\vspace{-0.4mm}
\\resumeSubHeadingListStart

${data.projects
  .map(({ title, tools, duration, link, highlights }) => {
    return `
\\resumeProject
    {${escapeLatex(title)}}
    {Tools: ${escapeLatex(tools.join(', '))}}
    {${escapeLatex(duration)}}
  {{}[\\href{${link}}{\\textcolor{darkblue}{\\faGithub}}]}
\\resumeItemListStart
    ${highlights.map((highlight) => `\\item ${escapeLatex(highlight)}`).join('\n    ')}
\\resumeItemListEnd
`;
  })
  .join('')}

\\resumeSubHeadingListEnd
\\vspace{-8mm}
`
    : ''
}


%----------SKILLS-----------------


${
  Object.keys(data.skills).length > 0
    ? `
\\section{\\textbf{Skills}}
\\vspace{-0.4mm}
\\resumeHeadingSkillStart
${Object.entries(data.skills)
  .map(([category, items]) => {
    return `\\resumeSubItem{${escapeLatex(category)}}{: ${items.map(escapeLatex).join(', ')}}`;
  })
  .join('\n')}
\\resumeHeadingSkillEnd
\\vspace{-2mm}
`
    : ''
}




%----------CERTIFICATIONS-----------------

${
  data.certifications.length > 0
    ? `
\\section{\\textbf{Certifications}}
\\vspace{-0.4mm}
\\resumeSubHeadingListStart
${data.certifications
  .map((cert) => {
    const certName = escapeLatex(cert.name);
    const issuer = escapeLatex(cert.issuingOrganization);
    const date = escapeLatex(cert.date);
    const link = cert.link ? `, \\href{${escapeLatex(cert.link)}}{${certName}}` : `{${certName}}`;

    return `\\resumePOR{${issuer}}{${link}}{${date}}`;
  })
  .join('\n')}

\\resumeSubHeadingListEnd

\\vspace{-6mm}
`
    : ''
}


%-----------ACHIEVEMENTS-----------------
${
  data.achievements.length > 0
    ? `
\\section{\\textbf{Achievements}}
\\vspace{-0.2mm}
\\resumeSubHeadingListStart
${data.achievements
  .map(({ title, link }) => {
    return `\\resumePOR{}{\\href{${link}}{${escapeLatex(title)}}}{}`;
  })
  .join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-6mm}
`
    : ''
}

%-----------POR-----------------

${
  data.positionsOfResponsibility.length > 0
    ? `
\\section{\\textbf{Positions of Responsibility}}
\\vspace{-0.4mm}
\\resumeSubHeadingListStart

    ${data.positionsOfResponsibility
      .map(({ title, organization, duration }) => {
        return `\\resumePOR{${escapeLatex(title)}, }{${escapeLatex(organization)}}{${escapeLatex(duration)}}`;
      })
      .join('\n')}

\\resumeSubHeadingListEnd
\\vspace{-5mm}
`
    : ''
}



\\end{document}`;
};
