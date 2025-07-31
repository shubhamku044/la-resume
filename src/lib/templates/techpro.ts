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
          { label: 'Live Link', url: 'https://la-resume.tech/' },
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

/*
%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
\\resumeItemListStart
  \\resumeItem{\\textbf{Programming Languages}: JavaScript, TypeScript, Python, Go}
  \\vspace{-1mm}
  \\resumeItem{\\textbf{Databases}: MySQL, MongoDB, PostgreSQL, Prisma, GORM}
    \\vspace{-1mm}
  \\resumeItem{\\textbf{Frameworks / Libraries}: Next.js, React.js, Vue.js, Nuxt.js, Gin, Express.js, Redux Toolkit, REST APIs}
    \\vspace{-1mm}
  \\resumeItem{\\textbf{DevOps / Tools}: Git, GitHub Actions, Docker, Nginx, CI/CD, AWS (EC2, S3), Postman, Vim, Linux}
    \\vspace{-1mm}
  \\resumeItem{\\textbf{Concepts}: Data Structures and Algorithms (DSA), System Design, OOP, Microservices, Agile Development}
\\resumeItemListEnd

\\vspace{-2mm}
%-----------EXPERIENCE-----------
\\section{Experience}
\\resumeSubHeadingListStart
\\resumeSubheading
{Testlify \\textnormal{ (Typescript, Vue.js, Nuxt.js, React Native, Express.js,  MongoDB)}}{Oct 2024 -- Present}
{Full Stack Developer}{Mumbai, IN (Remote)}
\\resumeItemListStart
  \\resumeItem{Contributed to TypeScript migration in Nuxt.js codebase, improving type safety and maintainability.}
  \\resumeItem{Replaced base64 image storage with direct S3 uploads from markdown editor, cutting DB bloat and API load.}
  \\resumeItem{Implemented multi-monitor proctoring to block external screens, strengthening exam integrity for 2,000+ users.}
  \\resumeItem{Refactored large Vue files by initiating Option-to-Composition API migration and guiding teammates to build reusable composables and components.}
  \\resumeItem{Integrated reCAPTCHA in OTP flow, preventing spam from overseas bots and saving \\$5,000+ in Twilio credits.}
  \\resumeItem{Managed React Native app via Expo; upgraded audio question flow and removed deprecated packages.}
  \\resumeItem{Replaced bulky libraries with native Expo Camera and rerouted audio uploads from api.video to GCP for better performance.}
\\resumeItemListEnd

\\resumeSubheading
{StylesterAI \\textnormal{ (TypeScript, React Native, Expo, Redux, Appwrite, Expo Router)}}{July 2024 -- Aug 2024}
{Full Stack Developer Intern}{Chennai, IN (Remote)}
\\resumeItemListStart
  \\resumeItem{Developed and maintained a performant cross-platform mobile app using React Native and Expo.}
  \\resumeItem{Rewrote state management layer by replacing Context API with Redux, improving performance and scalability.}
  \\resumeItem{Implemented authentication and backend services using Appwrite for seamless user data management.}
\\resumeItemListEnd

\\resumeSubheading
{Fable \\textnormal{ (React.js, Next.js, Express.js, AWS, Slack API, GA, GitHub Actions)}}{Nov 2022 -- June 2024}
{Software Engineer Intern (Founding Team)}{ Bengaluru, IN (Remote)}
\\resumeItemListStart
  \\resumeItem{Worked on Fable’s core B2B interactive demo platform from inception as part of the founding engineering team.}
  \\resumeItem{Built and maintained user interfaces in React.js using Styled Components, enhancing usability and code quality.}
  \\resumeItem{Created a real-time notification service integrating Slack API for instant alerts on form submissions.}
  \\resumeItem{Developed and maintained Fable's browser extension with shared auth and interactive preview support.}
  \\resumeItem{Built landing page with Next.js and implemented CI/CD on AWS via GitHub Actions, improving SEO and reducing deployment time.}
  \\resumeItem{Tracked events with Google Analytics, driving 9,000+ monthly visitors through behavior-based optimizations.}
\\resumeItemListEnd

% -----------Multiple Positions Heading-----------
%    \\resumeSubSubheading
%     {Software Engineer I}{Oct 2014 - Sep 2016}
%     \\resumeItemListStart
%        \\resumeItem{Apache Beam}
%          {Apache Beam is a unified model for defining both batch and streaming data-parallel processing pipelines}
%     \\resumeItemListEnd
%    \\resumeSubHeadingListEnd
%-------------------------------------------

\\resumeSubHeadingListEnd

\\vspace{-2mm}
%-----------PROJECTS-----------
\\section{Projects}
\\resumeSubHeadingListStart

\\resumeProjectHeading
{\\textbf{La-Resume} $|$ \\emph{Python, Next.js, Redux, MongoDB, Docker, AWS, Vercel, TeX Live}}{\\underline{\\href{https://la-resume.tech/}{Live Link}}
  \\underline{\\href{https://github.com/shubhamku044/la-resume}{GitHub}}}
\\resumeItemListStart
   \\resumeItem{Built an ATS-friendly resume builder with 1,800+ signups, 26,000+ views, and 25+ paying customers.}
  \\resumeItem{Enabled shareable resume links with view tracking; exported resumes as LaTeX PDFs via Dockerized TeX Live.}
  \\resumeItem{Deployed backend on AWS EC2 (Docker) and frontend on Vercel for global scalability.}
  \\resumeItem{Enabled paid plans via webhook-triggered Dodopayments integration, earned 160+ stars and 23+ forks with user-driven development.}
\\resumeItemListEnd

\\resumeProjectHeading
{\\textbf{YTClipper} $|$ \\emph{Go, Gin, Vite, React.js, Next.js, TurboRepo, Docker, GitHub Actions, NGINX}}{\\underline{\\href{https://yt-clipper.com}{Live Link}}}
\\resumeItemListStart
  \\resumeItem{Structured the app with a monorepo (TurboRepo) — shared UI, ESLint, Prettier, and Tailwind across frontend, backend, and landing page.}
  \\resumeItem{Dockerized all services and set up GitHub Actions CI/CD for per-branch deploys on VPS with NGINX subdomains and auto cleanup.}
  \\resumeItem{Created Chrome extension and synced authentication state between extension and web app using \\texttt{window.postMessage}.}
\\resumeItemListEnd

\\vspace{-2mm}
%-----------EDUCATION-----------
\\section{Education}
\\resumeSubHeadingListEnd
\\resumeSubHeadingListStart
\\resumeSubheading
{Techno Main Salt Lake}{Kolkata, India}
{Bachelors of Technology in Computer Science}{June. 2021 -- June 2025}
\\resumeSubHeadingListEnd

%

%-------------------------------------------
\\end{document}

*/

export const techPro = (data: TechProResumeData) => {
  const generateSubHeading = () => {
    /*
India $|$
  +91 620-221-7968 $|$ \href{mailto:shubhamku044@gmail.com}{\underline{shubhamku044@gmail.com}} $|$
  \href{https://linkedin.com/in/shubhamku044}{\underline{LinkedIn}} $|$
  \href{https://www.shubhams.dev/}{\underline{Portfolio}} $|$
  \href{https://github.com/shubhamku044}{\underline{Github}}
     */

    let socials: string = '';
    if (data.heading?.socials) {
      socials = data.heading.socials
        .map((social) => `\\href{${social.url}}{\\underline{${social.label}}}`)
        .join(' $|$ ');
      console.log(socials);
    }
    return `
`;
  };

  generateSubHeading();

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

  \\textbf{\\fontsize{50}{50}\\selectfont\\bfseries\\scshape Shubham Kumar} \\\\
  \\vspace{12pt} India $|$
  +91 620-221-7968 $|$ \\href{mailto:shubhamku044@gmail.com}{\\underline{shubhamku044@gmail.com}} $|$
  \\href{https://linkedin.com/in/shubhamku044}{\\underline{LinkedIn}} $|$
  \\href{https://www.shubhams.dev/}{\\underline{Portfolio}} $|$
  \\href{https://github.com/shubhamku044}{\\underline{Github}}

\\end{center}

\\vspace{-4mm}

%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
\\resumeItemListStart
  \\resumeItem{\\textbf{Programming Languages}: JavaScript, TypeScript, Python, Go}
  \\vspace{-1mm}
  \\resumeItem{\\textbf{Databases}: MySQL, MongoDB, PostgreSQL, Prisma, GORM}
    \\vspace{-1mm}
  \\resumeItem{\\textbf{Frameworks / Libraries}: Next.js, React.js, Vue.js, Nuxt.js, Gin, Express.js, Redux Toolkit, REST APIs}
    \\vspace{-1mm}
  \\resumeItem{\\textbf{DevOps / Tools}: Git, GitHub Actions, Docker, Nginx, CI/CD, AWS (EC2, S3), Postman, Vim, Linux}
    \\vspace{-1mm}
  \\resumeItem{\\textbf{Concepts}: Data Structures and Algorithms (DSA), System Design, OOP, Microservices, Agile Development}
\\resumeItemListEnd

\\vspace{-2mm}
%-----------EXPERIENCE-----------
\\section{Experience}
\\resumeSubHeadingListStart
\\resumeSubheading
{Testlify \\textnormal{ (Typescript, Vue.js, Nuxt.js, React Native, Express.js,  MongoDB)}}{Oct 2024 -- Present}
{Full Stack Developer}{Mumbai, IN (Remote)}
\\resumeItemListStart
  \\resumeItem{Contributed to TypeScript migration in Nuxt.js codebase, improving type safety and maintainability.}
  \\resumeItem{Replaced base64 image storage with direct S3 uploads from markdown editor, cutting DB bloat and API load.}
  \\resumeItem{Implemented multi-monitor proctoring to block external screens, strengthening exam integrity for 2,000+ users.}
  \\resumeItem{Refactored large Vue files by initiating Option-to-Composition API migration and guiding teammates to build reusable composables and components.}
  \\resumeItem{Integrated reCAPTCHA in OTP flow, preventing spam from overseas bots and saving \\$5,000+ in Twilio credits.}
  \\resumeItem{Managed React Native app via Expo; upgraded audio question flow and removed deprecated packages.}
  \\resumeItem{Replaced bulky libraries with native Expo Camera and rerouted audio uploads from api.video to GCP for better performance.}
\\resumeItemListEnd

\\resumeSubheading
{StylesterAI \\textnormal{ (TypeScript, React Native, Expo, Redux, Appwrite, Expo Router)}}{July 2024 -- Aug 2024}
{Full Stack Developer Intern}{Chennai, IN (Remote)}
\\resumeItemListStart
  \\resumeItem{Developed and maintained a performant cross-platform mobile app using React Native and Expo.}
  \\resumeItem{Rewrote state management layer by replacing Context API with Redux, improving performance and scalability.}
  \\resumeItem{Implemented authentication and backend services using Appwrite for seamless user data management.}
\\resumeItemListEnd

\\resumeSubheading
{Fable \\textnormal{ (React.js, Next.js, Express.js, AWS, Slack API, GA, GitHub Actions)}}{Nov 2022 -- June 2024}
{Software Engineer Intern (Founding Team)}{ Bengaluru, IN (Remote)}
\\resumeItemListStart
  \\resumeItem{Worked on Fable’s core B2B interactive demo platform from inception as part of the founding engineering team.}
  \\resumeItem{Built and maintained user interfaces in React.js using Styled Components, enhancing usability and code quality.}
  \\resumeItem{Created a real-time notification service integrating Slack API for instant alerts on form submissions.}
  \\resumeItem{Developed and maintained Fable's browser extension with shared auth and interactive preview support.}
  \\resumeItem{Built landing page with Next.js and implemented CI/CD on AWS via GitHub Actions, improving SEO and reducing deployment time.}
  \\resumeItem{Tracked events with Google Analytics, driving 9,000+ monthly visitors through behavior-based optimizations.}
\\resumeItemListEnd

% -----------Multiple Positions Heading-----------
%    \\resumeSubSubheading
%     {Software Engineer I}{Oct 2014 - Sep 2016}
%     \\resumeItemListStart
%        \\resumeItem{Apache Beam}
%          {Apache Beam is a unified model for defining both batch and streaming data-parallel processing pipelines}
%     \\resumeItemListEnd
%    \\resumeSubHeadingListEnd
%-------------------------------------------

\\resumeSubHeadingListEnd

\\vspace{-2mm}
%-----------PROJECTS-----------
\\section{Projects}
\\resumeSubHeadingListStart

\\resumeProjectHeading
{\\textbf{La-Resume} $|$ \\emph{Python, Next.js, Redux, MongoDB, Docker, AWS, Vercel, TeX Live}}{\\underline{\\href{https://la-resume.tech/}{Live Link}}
  \\underline{\\href{https://github.com/shubhamku044/la-resume}{GitHub}}}
\\resumeItemListStart
   \\resumeItem{Built an ATS-friendly resume builder with 1,800+ signups, 26,000+ views, and 25+ paying customers.}
  \\resumeItem{Enabled shareable resume links with view tracking; exported resumes as LaTeX PDFs via Dockerized TeX Live.}
  \\resumeItem{Deployed backend on AWS EC2 (Docker) and frontend on Vercel for global scalability.}
  \\resumeItem{Enabled paid plans via webhook-triggered Dodopayments integration, earned 160+ stars and 23+ forks with user-driven development.}
\\resumeItemListEnd


\\resumeProjectHeading
{\\textbf{YTClipper} $|$ \\emph{Go, Gin, Vite, React.js, Next.js, TurboRepo, Docker, GitHub Actions, NGINX}}{\\underline{\\href{https://yt-clipper.com}{Live Link}}}
\\resumeItemListStart
  \\resumeItem{Structured the app with a monorepo (TurboRepo) — shared UI, ESLint, Prettier, and Tailwind across frontend, backend, and landing page.}
  \\resumeItem{Dockerized all services and set up GitHub Actions CI/CD for per-branch deploys on VPS with NGINX subdomains and auto cleanup.}
  \\resumeItem{Created Chrome extension and synced authentication state between extension and web app using \\texttt{window.postMessage}.}
\\resumeItemListEnd

\\vspace{-2mm}
%-----------EDUCATION-----------
\\section{Education}
\\resumeSubHeadingListEnd
\\resumeSubHeadingListStart
\\resumeSubheading
{Techno Main Salt Lake}{Kolkata, India}
{Bachelors of Technology in Computer Science}{June. 2021 -- June 2025}
\\resumeSubHeadingListEnd

%

%-------------------------------------------
\\end{document}

`;
};
