import { escapeLatex } from '../utils';

export type Sb2novResumeData = {
  heading: {
    name: string;
    phone?: string;
    email?: string;
    location?: string;
    socials: {
      name: string;
      url: string;
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
      marks: string;
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
      title: string;
      date: string | '';
      accomplishments: string[];
    }[];
  };
  projects: {
    sectionTitle: string;
    entries: {
      id: string;
      title: string;
      url: string;
      urlLabel: string;
      accomplishments: string[];
    }[];
  };
  honorsAndAwards: {
    sectionTitle: string;
    entries: {
      id: string;
      description: string;
      url?: string;
      urlLabel?: string;
    }[];
  };
  sectionOrder?: Array<'education' | 'skills' | 'experience' | 'projects' | 'honorsAndAwards'>;
};

export const sb2novResumeSampleData: Sb2novResumeData = {
  heading: {
    name: 'John Doe',
    phone: '+1 (123) 456 7890',
    email: 'john@doe.com',
    location: 'Kolkata, India',
    socials: [
      {
        name: 'Portfolio',
        url: 'https://johndoe.com',
      },
      {
        name: 'Github',
        url: 'github.com/shubhamku044/la-resume',
      },
      {
        name: 'LinkedIn',
        url: 'linkedin.com/in/johndoe',
      },
      {
        name: 'LeetCode',
        url: 'leetcode.com/johndoe',
      },
      {
        name: 'Codeforces',
        url: 'codeforces.com/johndoe',
      },
    ],
  },
  education: {
    sectionTitle: 'education',
    entries: [
      {
        id: 'a5092564-55f6-45a8-8866-5ab0ae54a079',
        institution: 'Massachusetts Institute of Technology',
        location: 'Cambridge, MA, USA',
        degree: 'Bachelor of Science in Computer Science',
        startDate: 'Sep. 2018',
        endDate: 'June 2022',
        marks: 'CGPA: 3.8/4.0',
      },
      {
        id: 'ecf2eab2-1f61-4020-983d-d57b55a6c51f',
        institution: 'Central High School',
        location: 'Springfield, IL, USA',
        degree: 'High School Diploma',
        startDate: 'Sep. 2014',
        endDate: 'June 2018',
        marks: 'Percentage: 92.5%',
      },
      {
        id: '1c4640b7-5524-4cd1-b642-bbaa08669efc',
        institution: 'Stanford University',
        location: 'Stanford, CA, USA',
        degree: 'Master of Science in Artificial Intelligence',
        startDate: 'Sep. 2022',
        endDate: 'June 2024',
        marks: 'CGPA: 3.9/4.0',
      },
    ],
  },
  skills: {
    sectionTitle: 'Skills',
    entries: [
      {
        category: 'Programming skills',
        items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#'],
      },
      {
        category: 'databases',
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
      },
      {
        category: 'frameworks',
        items: ['React', 'Node.js', 'Express.js', 'Django', 'Spring Boot'],
      },
      {
        category: 'developerTools',
        items: ['Git', 'Docker', 'Webpack', 'VS Code', 'Jenkins'],
      },
    ],
  },
  experience: {
    sectionTitle: 'experience',
    entries: [
      {
        id: 'eb8aefd0-2fad-4a75-a533-6d67b50baf7b',
        title: 'SCALE AI (Outlier) - C++ AI Trainer (Freelance)',
        date: 'Oct 2024',
        accomplishments: [
          'Conducted A/B testing on 50+ AI model responses, optimizing performance using C++.',
          'Created 10+ complex prompts to improve model training and achieve higher accuracy.',
          'Evaluated over 200 AI responses for accuracy, relevance, and quality across predefined categories.',
          'Provided targeted feedback that led to improvement in AI decision-making and output quality.',
        ],
      },
      {
        id: 'ebf8b5e5-e8b7-4f8c-8910-95f4f50e1df0',
        title: 'Pyccel',
        date: 'Jan 2024',
        accomplishments: [
          'Added support for numpy.max and numpy.min in the C printer, including macro definitions, AST updates, and Fortran support for complex numbers.',
          'Resolved issue #1645 by replacing deprecated AST classes with Constant (Python 3.8+), ensuring compatibility with newer Python versions.',
        ],
      },
      {
        id: '1f67dfe1-e985-4b7a-8a4c-4af35b8c1491',
        title: 'TechCorp - Software Engineer Intern',
        date: 'May 2023 -- Aug 2023',
        accomplishments: [
          'Developed a RESTful API using Node.js, reducing server response time by 30%.',
          'Collaborated with a team of 5 to implement CI/CD pipelines using Jenkins and Docker.',
          'Optimized database queries in PostgreSQL, improving data retrieval speed by 25%.',
        ],
      },
    ],
  },
  projects: {
    sectionTitle: 'projects',
    entries: [
      {
        id: '9fef2c38-5026-4fa8-806d-22e95580c3f5',
        title: 'Personal Portfolio',
        url: 'https://johndoe.com',
        urlLabel: 'Link',
        accomplishments: [
          'Developed a responsive portfolio website using Next.js, TypeScript, and Tailwind CSS to showcase projects and skills.',
          'Designed a clean UI, improving load time by 20%.',
          'Deployed on Vercel, achieving 99% uptime.',
        ],
      },
      {
        id: 'cc288be9-b998-4614-bc5c-225c5efaaf46',
        title: 'E-Commerce Platform',
        url: 'https://github.com/johndoe/ecommerce',
        urlLabel: 'Github Link',
        accomplishments: [
          'Built a full-stack app with React and Node.js, increasing user engagement by 30%.',
          'Integrated Stripe, processing 1000+ transactions with 99% success rate.',
          'Optimized backend, reducing API latency by 25%.',
        ],
      },
    ],
  },
  honorsAndAwards: {
    sectionTitle: 'honorsAndAwards',
    entries: [
      {
        id: '943f583a-18f9-44d4-bb5e-82860cfd2e5a',
        description: 'Achieved a 2123 rating (Knight) and ranked in the top 1.5% of LeetCode users',
        url: 'https://leetcode.com/johndoe',
        urlLabel: 'Profile',
      },
      {
        id: '37cbaf94-8cdd-48ab-a208-7ee5a730176d',
        description: 'Solved 2000+ DSA problems across all platforms',
      },
      {
        id: '2ecd25a7-51c5-4311-b1b7-0cc4dc851b1f',
        description:
          'Selected for Amazon Machine Learning Summer School 2024 among top 5% of applicants',
        url: 'https://aws.amazon.com/education/ml-summer-school',
        urlLabel: 'Certificate',
      },
      {
        id: '711b2674-c0c4-4e13-93e8-9f331b347495',
        description: 'Qualified for Round 2 in Meta Hacker Cup 2024, placing in top 10%',
        url: 'https://www.facebook.com/codingcompetitions/hacker-cup/2024',
      },
      {
        id: '093ee050-a57a-4454-ba91-d62f235195db',
        description: 'Won regional coding competition, beating 95% of participants',
      },
    ],
  },
  sectionOrder: ['education', 'skills', 'experience', 'projects', 'honorsAndAwards'],
};

export const sb2nov = (data: Sb2novResumeData) => {
  const contactItems: string[] = [];

  if (data.heading.phone) {
    contactItems.push(escapeLatex(data.heading.phone));
  }

  if (data.heading.email) {
    contactItems.push(
      `\\href{mailto:${escapeLatex(data.heading.email)}}{\\textbf{${escapeLatex(data.heading.email)}}}`
    );
  }

  data.heading.socials.forEach((social) => {
    if (social.url) {
      contactItems.push(
        `\\href{${escapeLatex(social.url)}}{\\textbf{${escapeLatex(social.name)}}}`
      );
    }
  });
  const contactLine = contactItems.length > 0 ? `\\small ${contactItems.join(' $|$ ')}` : '';

  const generateSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'education':
        return data.education.entries.length > 0
          ? `
          \\section{${escapeLatex(data.education.sectionTitle)}}
          \\resumeSubHeadingListStart
          ${data.education.entries
            .map(
              (edu) => `
            \\resumeSubheading
            {${escapeLatex(edu.institution)}}{${escapeLatex(edu.location)}}
            {${escapeLatex(edu.degree)}${edu.marks ? `; ${escapeLatex(edu.marks)}` : ''}}
            {${escapeLatex(edu.startDate)} -- ${escapeLatex(edu.endDate)}}
          `
            )
            .join('')}
          \\resumeSubHeadingListEnd
        `
          : '';

      case 'skills':
        return data.skills.entries.length > 0
          ? `
          \\section{${escapeLatex(data.skills.sectionTitle)}}
          \\resumeSubHeadingListStart
          \\resumeItemListStart
          ${data.skills.entries
            .map(
              (entry) => `
            \\resumeItem{\\textbf{${escapeLatex(entry.category)}}: ${entry.items.map(escapeLatex).join(', ')}}
          `
            )
            .join('\n')}
          \\resumeItemListEnd
          \\resumeSubHeadingListEnd
        `
          : '';

      case 'experience':
        return data.experience.entries.length > 0
          ? `
          \\section{${escapeLatex(data.experience.sectionTitle)}}
          ${data.experience.entries
            .map(
              (exp) => `
            \\resumeSubHeadingListStart
            \\resumeProjectHeading
            {\\textbf{${escapeLatex(exp.title)}}}{${escapeLatex(exp.date)}}
            \\resumeItemListStart
            ${exp.accomplishments.map((a) => `\\resumeItem{${escapeLatex(a)}}`).join('\n')}
            \\resumeItemListEnd
            \\resumeSubHeadingListEnd
          `
            )
            .join('\n')}
        `
          : '';

      case 'projects':
        return data.projects.entries.length > 0
          ? `
          \\section{${escapeLatex(data.projects.sectionTitle)}}
          ${data.projects.entries
            .map(
              (proj) => `
            \\resumeSubHeadingListStart
            \\resumeProjectHeading
            {\\textbf{${escapeLatex(proj.title)}}}
            {\\href{${escapeLatex(proj.url)}}{${escapeLatex(proj.urlLabel)}}}
            \\resumeItemListStart
            ${proj.accomplishments.map((a) => `\\resumeItem{${escapeLatex(a)}}`).join('\n')}
            \\resumeItemListEnd
            \\resumeSubHeadingListEnd
          `
            )
            .join('\n')}
        `
          : '';

      case 'honorsAndAwards':
        return data.honorsAndAwards.entries.length > 0
          ? `
\\section{${escapeLatex(data.honorsAndAwards.sectionTitle)}}
\\resumeSubHeadingListStart
${data.honorsAndAwards.entries
  .map(({ description, url, urlLabel }) => {
    const escapedDescription = escapeLatex(description);
    const urlText = url
      ? `\\hfill \\href{${escapeLatex(url)}}{\\underline{${escapeLatex(urlLabel || 'Link')}}}`
      : '';
    return `\\resumeItem{${escapedDescription}${urlText}}`;
  })
  .join('\n    ')}
\\resumeSubHeadingListEnd
        `
          : '';

      default:
        return '';
    }
  };

  const sections = data.sectionOrder || [
    'education',
    'skills',
    'experience',
    'projects',
    'honorsAndAwards',
  ];
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

${sectionContent}

\\end{document}
`;
};
