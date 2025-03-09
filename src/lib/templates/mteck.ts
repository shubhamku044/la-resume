import { escapeLatex } from '../utils';

export type MTeckResumeData = {
  personalInfo: {
    name: string;
    phone: string;
    email: string;
    github: string;
    linkedin: string;

    summary: string;
  };

  skills: Record<string, string[]>;
  experience: {
    id: string;
    company: string;
    duration: string;
    role: string;
    achievements: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
  }[];
  certificates: string[];
  projects: {
    id: string;
    title: string;
    duration: string;
    details: string[];
  }[];
};

export const mteckResumeSampleData = {
  personalInfo: {
    name: 'John Doe',
    phone: '123-456-7890',
    email: 'user@domain.tld',
    linkedin: 'linkedin.com/in/USER',
    github: 'github.com/USER',
    summary:
      'Simplified version of a monstrosity that I built back in college using current best practices.',
  },
  skills: {
    Automation: ['SaltStack', 'Ansible', 'Chef', 'Puppet'],
    Cloud: ['Salt-Cloud', 'Linode', 'GCP', 'AWS'],
    Languages: ['Python', 'Bash', 'PHP', 'Perl', 'VB/C#.Net'],
    OS: ['Debian', 'Ubuntu', 'CentOS', 'BSD', 'AIX'],
    Policies: ['CIS', 'SOC2', 'PCI-DSS', 'GDPR', 'ITIL'],
    Testing: ['Pytest', 'Docker', 'CircleCI', 'Jenkins', 'Inspec'],
  },
  experience: [
    {
      id: '1',
      company: 'Consulting Corp',
      duration: 'Jul 2015 – Jun 2025',
      role: 'Senior DevOps Engineer (FTE Consultant)',
      achievements: [
        'Analyzed network traffic patterns to identify bottlenecks and optimize performance',
        'Implemented firewall rules to enhance network security and prevent unauthorized access',
        'Conducted regular vulnerability assessments and applied patches to secure systems',
        'Collaborated with cross-functional teams to streamline IT processes and improve efficiency',
        'Configured monitoring tools to track system performance and troubleshoot issues proactively',
        'Automated routine tasks using scripts to reduce manual effort and increase productivity',
        'Documented system configurations and procedures for knowledge sharing within the team',
        'Participated in disaster recovery planning and drills to ensure business continuity in case of emergencies',
        'Implemented cloud migration strategies to move applications to a hybrid environment',
        'Optimized database performance through indexing and query tuning techniques',
        'Conducted capacity planning and scalability assessments to support future growth',
        'Provided on-call support for critical issues and worked on root cause analysis for incident resolution',
      ],
    },
    {
      id: '2',
      company: 'HealthCo Industries',
      duration: 'Feb 2011 – Mar 2016',
      role: 'Senior Systems Administrator (SRE)',
      achievements: [
        'Managed virtualized server environment spanning multiple data centers',
        'Oversaw migration of critical business applications to cloud-based platforms',
        'Configured and monitored network security measures, including firewalls and intrusion detection systems',
        'Implemented multi-factor authentication for remote access to company systems',
        'Streamlined patch management process, reducing vulnerabilities and downtime',
        'Conducted regular vulnerability assessments and penetration testing',
        'Automated server provisioning and configuration management tasks',
        'Maintained documentation for IT policies and procedures',
        'Coordinated responses to cybersecurity incidents with internal teams and external vendors',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'State University',
      degree: 'Bachelor of Science in Computer Information Systems',
    },
  ],
  certificates: ['Salt - SaltStack Certified Engineer', 'GCP - Professional Cloud Architect'],
  projects: [
    {
      id: '1',
      title: 'Hospital / Health Science IRB',
      duration: 'Mar 2015 – Present',
      details: [
        'Served as non-scientific/unaffiliated patient-representative',
        'Reviewed patient consent forms for completeness, accuracy, and clarity',
        'Became familiar with industry standards and regulations (OHRP, HIPAA)',
      ],
    },
    {
      id: '2',
      title: 'Debian Linux',
      duration: 'Jan 2001 – Present',
      details: [
        'Maintained packages in Debian repositories',
        'Reviewed and sponsored packages on behalf of prospective Developers',
        'Resolved bugs reported in bug tracking system',
      ],
    },
  ],
};
export const mteck = (data: MTeckResumeData) => {
  return `%%%%
% MTecknology's Resume
%%%%
% Author: Michael Lustfield
% License: CC-BY-4
% - https://creativecommons.org/licenses/by/4.0/legalcode.txt
%%%%

\\documentclass[letterpaper,10pt]{article}
%%%%%%%%%%%%%%%%%%%%%%%
%% BEGIN_FILE: mteck.sty
%% NOTE: Everything between here and END_FILE can
%% be relocated to "mteck.sty" and then included with:
%\\usepackage{mteck}

% Dependencies
% NOTE: Some packages (lastpage, hyperref) require second build!
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\usepackage{bookmark}
\\usepackage{lastpage}

% Sans-Serif
%\\usepackage[sfdefault]{FiraSans}
%\\usepackage[sfdefault]{roboto}
%\\usepackage[sfdefault]{noto-sans}
%\\usepackage[default]{sourcesanspro}

% Serif
\\usepackage{CormorantGaramond}
\\usepackage{charter}

% Colors
% Use with \\color{Name}
% Can wrap entire heading with {\\color{accent} [...] }
\\usepackage{xcolor}
\\definecolor{accentTitle}{HTML}{0e6e55}
\\definecolor{accentText}{HTML}{0e6e55}
\\definecolor{accentLine}{HTML}{a16f0b}

% Misc. Options
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\urlstyle{same}

% Adjust Margins
\\addtolength{\\oddsidemargin}{-0.7in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-0.7in}
\\addtolength{\\textheight}{1.4in}

\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\setlength{\\tabcolsep}{0pt}
\\setlength{\\footskip}{3.7pt}
\\raggedbottom
\\raggedright

% ATS Readability
\\input{glyphtounicode}
\\pdfgentounicode=1

%-----------------%
% Custom Commands %
%-----------------%

% Centered title along with subtitle between HR
% Usage: \\documentTitle{Name}{Details}
\\newcommand{\\documentTitle}[2]{
  \\begin{center}
    {\\Huge\\color{accentTitle} #1}
    \\vspace{10pt}
    {\\color{accentLine} \\hrule}
    \\vspace{2pt}
    %{\\footnotesize\\color{accentTitle} #2}
    \\footnotesize{#2}
    \\vspace{2pt}
    {\\color{accentLine} \\hrule}
  \\end{center}
}

% Create a footer with correct padding
% Usage: \\documentFooter{\\thepage of X}
\\newcommand{\\documentFooter}[1]{
  \\setlength{\\footskip}{10.25pt}
  \\fancyfoot[C]{\\footnotesize #1}
}

% Simple wrapper to set up page numbering
% Usage: \\numberedPages
% WARNING: Must run pdflatex twice!
\\newcommand{\\numberedPages}{
  \\documentFooter{\\thepage/\\pageref{LastPage}}
}

% Section heading with horizontal rule
% Usage: \\section{Title}
\\titleformat{\\section}{
  \\vspace{-5pt}
  \\color{accentText}
  \\raggedright\\large\\bfseries
}{}{0em}{}[\\color{accentLine}\\titlerule]

% Section heading with separator and content on same line
% Usage: \\tinysection{Title}
\\newcommand{\\tinysection}[1]{
  \\phantomsection
  \\addcontentsline{toc}{section}{#1}
  {\\large{\\bfseries\\color{accentText}#1} {\\color{accentLine} |}}
}

% Indented line with arguments left/right aligned in document
% Usage: \\heading{Left}{Right}
\\newcommand{\\heading}[2]{
  \\hspace{10pt}#1\\hfill#2\\\\
}

% Adds \\textbf to \\heading
\\newcommand{\\headingBf}[2]{
  \\heading{\\textbf{#1}}{\\textbf{#2}}
}

% Adds \\textit to \\heading
\\newcommand{\\headingIt}[2]{
  \\heading{\\textit{#1}}{\\textit{#2}}
}

% Template for itemized lists
% Usage: \\begin{resume_list} [items] \\end{resume_list}
\\newenvironment{resume_list}{
  \\vspace{-7pt}
  \\begin{itemize}[itemsep=-2px, parsep=1pt, leftmargin=30pt]
}{
  \\end{itemize}
  %\\vspace{-2pt}
}

% Formats an item to use as an itemized title
% Usage: \\itemTitle{Title}
\\newcommand{\\itemTitle}[1]{
  \\item[] \\underline{#1}\\vspace{4pt}
}

% Bullets used in itemized lists
\\renewcommand\\labelitemi{--}

%% END_FILE: mteck.sty
%%%%%%%%%%%%%%%%%%%%%%


%===================%
% John Doe's Resume %
%===================%

%\\numberedPages % NOTE: lastpage requires a second build
%\\documentFooter{\\thepage of 2} % Does similar without using lastpage
\\begin{document}
%---------%
% Heading %
%---------%

\\documentTitle{${escapeLatex(data.personalInfo.name)}}{
    % Web Version
    %\\raisebox{-0.05\\height} \\faPhone\\ [redacted - web copy] ~
    %\\raisebox{-0.15\\height} \\faEnvelope\\ [redacted - web copy] ~
    %%
    ${
      data.personalInfo.phone
        ? `\\href{tel:${escapeLatex(data.personalInfo.phone)}}{
          \\raisebox{-0.05\\height} \\faPhone\\ ${escapeLatex(data.personalInfo.phone)}} `
        : ''
    }
    ${
      data.personalInfo.email
        ? `\\href{mailto:${escapeLatex(data.personalInfo.email)}}{~ | ~
          \\raisebox{-0.15\\height} \\faEnvelope\\ ${escapeLatex(data.personalInfo.email)}} `
        : ''
    }
    ${
      data.personalInfo.github
        ? `\\href{https://github.com/${escapeLatex(data.personalInfo.github)}}{~ | ~
          \\raisebox{-0.15\\height} \\faGithub\\ ${escapeLatex(data.personalInfo.github)}}`
        : ''
    }
    ${
      data.personalInfo.linkedin
        ? `\\href{https://linkedin.com/in/${escapeLatex(data.personalInfo.linkedin)}}{~ | ~
          \\raisebox{-0.15\\height} \\faLinkedin\\ ${escapeLatex(data.personalInfo.linkedin)}}`
        : ''
    }
    
  }
  %---------%
% Summary %
%---------%

\\tinysection{Summary}
${escapeLatex(data.personalInfo.summary)}
${
  Object.keys(data.skills).length > 0
    ? `
%--------%
% Skills %
%--------%

\\section{Skills}

\\begin{multicols}{2}
  \\begin{itemize}[itemsep=-2px, parsep=1pt, leftmargin=75pt]
    ${Object.entries(data.skills)
      .map(
        ([category, items]) => `
      \\item[\\textbf{${escapeLatex(category)}}] ${escapeLatex(items.join(', '))}`
      )
      .join('\n')}
  \\end{itemize}
\\end{multicols}
`
    : ''
}

${
  data.experience.length > 0
    ? `
%------------%
% Experience %
%------------%

\\section{Experience}

${data.experience
  .map(
    (exp) => `
  \\headingBf{${escapeLatex(exp.company)}}{${escapeLatex(exp.duration)}}
  \\headingIt{${escapeLatex(exp.role)}}{}
  \\begin{resume_list}
    ${exp.achievements
      .map(
        (achievement) => `
    \\item ${escapeLatex(achievement)}`
      )
      .join('\n')}
  \\end{resume_list}
`
  )
  .join('\n')}
`
    : ''
}
%-----------%
% Education %
%-----------%

%-----------%
% Education %
%-----------%

\\section{Education}

${
  data.education?.length > 0
    ? data.education
        .map(
          (edu) => `
  \\headingBf{${escapeLatex(edu.institution)}}{}
  \\headingIt{${escapeLatex(edu.degree)}}{}
`
        )
        .join('\n')
    : ''
}

${
  data.certificates?.length > 0
    ? `
\\vspace{5pt}
\\headingBf{Certifications}{}
\\begin{resume_list}
  ${data.certificates
    .map(
      (cert) => `
    \\item ${escapeLatex(cert)}`
    )
    .join('\n')}
\\end{resume_list}
`
    : ''
}
${
  data.projects.length > 0
    ? `
%----------------------------%
% Extracurricular Activities %
%----------------------------%

\\section{Projects}

${data.projects
  .map(
    (project) => `
  \\headingBf{${escapeLatex(project.title)}}{${escapeLatex(project.duration)}}
  \\begin{resume_list}
    ${project.details
      .map(
        (detail) => `
    \\item ${escapeLatex(detail)}`
      )
      .join('\n')}
  \\end{resume_list}
`
  )
  .join('\n')}
`
    : ''
}
\\end{document}`;
};
