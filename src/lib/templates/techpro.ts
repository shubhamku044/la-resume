import { escapeLatex } from '../utils';

export type TechProResumeData = {
  heading: {
    name: string;
    email: string;
    phone: string;
    location: string;
    socials: {
      label: string;
      url: string;
    }[];
  };
  skills: {
    sectionTitle: string;
    entries: {
      category: string;
      items: string[];
    }[];
  };
  experience: {
    sectionTitle: string;
    entries: {
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      location: string;
      skills: string[];
      accomplishments: string[];
    }[];
  };
  projects: {
    sectionTitle: string;
    entries: {
      id: string;
      title: string;
      skills: string[];
      accomplishments: string[];
      urls: {
        label: string;
        url: string;
      }[];
    }[];
  };
  education: {
    sectionTitle: string;
    entries: {
      id: string;
      institution: string;
      location: string;
      degree: string;
      startDate: string;
      endDate: string;
    }[];
  };
  sectionOrder?: Array<'skills' | 'experience' | 'projects' | 'education'>;
};

export const techProResumeSampleData: TechProResumeData = {
  heading: {
    name: 'Shubham Kumar',
    email: 'shubhamku044@gmail.com',
    phone: '+91 620-221-7968',
    location: 'India',
    socials: [
      { label: 'Portfolio', url: 'https://www.shubhams.dev/' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/shubhamku044' },
      { label: 'GitHub', url: 'https://github.com/shubhamku044' },
      { label: 'Twitter', url: 'https://twitter.com/shubhamku044' },
    ],
  },
  skills: {
    sectionTitle: 'Technical Skills',
    entries: [
      {
        category: 'Programming Languages',
        items: ['JavaScript', 'TypeScript', 'Python', 'Go'],
      },
      {
        category: 'Databases',
        items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Prisma', 'GORM'],
      },
      {
        category: 'Frameworks / Libraries',
        items: [
          'Next.js',
          'React.js',
          'Vue.js',
          'Nuxt.js',
          'Gin',
          'Express.js',
          'Redux Toolkit',
          'REST APIs',
        ],
      },
      {
        category: 'DevOps / Tools',
        items: ['Git', 'GitHub Actions', 'Docker', 'Nginx', 'CI/CD', 'AWS (EC2, S3)', 'Postman'],
      },
    ],
  },
  experience: {
    sectionTitle: 'Experience',
    entries: [
      {
        id: '1',
        company: 'Testlify',
        position: 'Full Stack Developer',
        startDate: 'Oct 2024',
        endDate: 'Present',
        location: 'Mumbai, IN (Remote)',
        skills: ['TypeScript', 'Vue.js', 'Nuxt.js', 'React Native', 'Express.js', 'MongoDB'],
        accomplishments: [
          'Contributed to TypeScript migration in Nuxt.js codebase, improving type safety and maintainability.',
          'Implemented multi-monitor proctoring to block external screens, strengthening exam integrity for 2,000+ users.',
          'Refactored large Vue files by initiating Option-to-Composition API migration and guiding teammates to build reusable composables and components.',
        ],
      },
      {
        id: '2',
        company: 'StylesterAI',
        position: 'Full Stack Developer Intern',
        startDate: 'July 2024',
        endDate: 'Aug 2024',
        location: 'Chennai, IN (Remote)',
        skills: ['TypeScript', 'React Native', 'Expo', 'Redux', 'Appwrite'],
        accomplishments: [
          'Developed and maintained a performant cross-platform mobile app using React Native and Expo.',
          'Rewrote state management layer by replacing Context API with Redux, improving performance and scalability.',
          'Implemented authentication and backend services using Appwrite for seamless user data management.',
        ],
      },
    ],
  },
  projects: {
    sectionTitle: 'Projects',
    entries: [
      {
        id: '1',
        title: 'La-Resume',
        skills: ['Python', 'Next.js', 'Redux', 'MongoDB', 'Docker', 'AWS', 'Vercel', 'TeX Live'],
        accomplishments: [
          'Built an ATS-friendly resume builder with 1,800+ signups, 26,000+ views, and 25+ paying customers.',
          'Enabled shareable resume links with view tracking; exported resumes as LaTeX PDFs via Dockerized TeX Live.',
          'Deployed backend on AWS EC2 (Docker) and frontend on Vercel for global scalability.',
        ],
        urls: [
          { label: 'Live Link', url: 'https://la-resume.com/' },
          { label: 'GitHub', url: 'https://github.com/shubhamku044/la-resume' },
        ],
      },
    ],
  },
  education: {
    sectionTitle: 'Education',
    entries: [
      {
        id: '1',
        institution: 'Techno Main Salt Lake',
        location: 'Kolkata, India',
        degree: 'Bachelors of Technology in Computer Science',
        startDate: 'June 2021',
        endDate: 'June 2025',
      },
    ],
  },
  sectionOrder: ['skills', 'experience', 'projects', 'education'],
};

export const techPro = (data: TechProResumeData) => {
  const generateSubHeading = () => {
    /*
India $|$
  +91 620-221-7968 $|$ \href{mailto:shubhamku044@gmail.com}{\underline{shubhamku044@gmail.com}} $|$
  \href{https://linkedin.com/in/shubhamku044}{\underline{LinkedIn}} $|$
  \href{https://www.shubhams.dev/}{\underline{Portfolio}} $|$
  \href{https://github.com/shubhamku044}{\underline{Github}}
     */
    const details = [];
    if (data.heading.location) {
      details.push(escapeLatex(data.heading.location));
    }
    if (data.heading.phone) {
      details.push(escapeLatex(data.heading.phone));
    }
    if (data.heading.email) {
      details.push(
        `\\href{mailto:${escapeLatex(data.heading.email)}}{\\underline{${escapeLatex(data.heading.email)}}}`
      );
    }
    if (data.heading.socials) {
      data.heading.socials.forEach((social) => {
        details.push(
          `\\href{${escapeLatex(social.url)}}{\\underline{${escapeLatex(social.label)}}}`
        );
      });
    }
    return `${details.join(' $|$ ')}`;
  };

  const generateSection = (sectionKey: keyof TechProResumeData) => {
    switch (sectionKey) {
      case 'skills':
        return data.skills.entries.length
          ? `
%-----------PROGRAMMING SKILLS-----------
\\section{${escapeLatex(data.skills.sectionTitle)}}
\\resumeItemListStart
  ${data.skills.entries
    .map(
      (entry) =>
        `\\resumeItem{\\textbf{${escapeLatex(entry.category)}}: ${escapeLatex(entry.items.join(', '))}}\\vspace{-1mm}`
    )
    .join('\n  ')}
\\resumeItemListEnd
\\vspace{-2mm}
        `
          : ``;

      case 'experience':
        return data.experience.entries.length
          ? `

%-----------EXPERIENCE-----------
\\section{${escapeLatex(data.experience.sectionTitle)}}
\\resumeSubHeadingListStart

${data.experience.entries
  .map(
    (entry) => `\\resumeSubheading
{${escapeLatex(entry.company)} \\textnormal{ (${escapeLatex(entry.skills.join(', '))})}}{${escapeLatex(entry.startDate)} -- ${escapeLatex(entry.endDate)}}
{${escapeLatex(entry.position)}}{${escapeLatex(entry.location)}}
\\resumeItemListStart
  ${entry.accomplishments
    .map((accomplishment) => `\\resumeItem{${escapeLatex(accomplishment)}}`)
    .join('\n  ')}
\\resumeItemListEnd`
  )
  .join('\n\n')}
\\resumeSubHeadingListEnd
\\vspace{-2mm}
        `
          : '';

      case 'projects':
        return data.projects.entries.length
          ? `
%-----------PROJECTS-----------
\\section{${escapeLatex(data.projects.sectionTitle)}}
\\resumeSubHeadingListStart
${data.projects.entries
  .map(
    (entry) => `\\resumeProjectHeading
{\\textbf{${escapeLatex(entry.title)}} $|$ \\emph{${escapeLatex(entry.skills.join(', '))}}}{${entry.urls
      .map((url) => `\\underline{\\href{${escapeLatex(url.url)}}{${escapeLatex(url.label)}}}`)
      .join(' $|$ ')}}
\\resumeItemListStart
  ${entry.accomplishments
    .map((accomplishment) => `\\resumeItem{${escapeLatex(accomplishment)}}`)
    .join('\n  ')}
\\resumeItemListEnd`
  )
  .join('\n\n')}
\\resumeSubHeadingListEnd
\\vspace{-2mm}
        `
          : '';
      case 'education':
        return data.education.entries.length
          ? `
%-----------EDUCATION-----------
\\section{${escapeLatex(data.education.sectionTitle)}}
\\resumeSubHeadingListStart
${data.education.entries
  .map(
    (entry) => `\\resumeSubheading
{${escapeLatex(entry.institution)}}{${entry.startDate} -- ${entry.endDate}}
{${escapeLatex(entry.degree)}}{${escapeLatex(entry.location)}}
`
  )
  .join('\n\n')}
\\resumeSubHeadingListEnd
\\vspace{-2mm}
        `
          : '';
    }
  };

  const sections = data.sectionOrder || ['skills', 'experience', 'projects', 'education'];

  const sectionContent = sections.map(generateSection).filter(Boolean).join('\n');

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
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generated pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

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

  \\textbf{\\fontsize{50}{50}\\selectfont\\bfseries\\scshape ${escapeLatex(data.heading.name)}} \\\\
  \\vspace{12pt} ${generateSubHeading()}

\\end{center}

% \\vspace{-4mm}

${sectionContent}

\\end{document}

`;
};
