'use client';

import { classic } from '@/lib/templates/index';
import type { ClassicResumeData } from '@/lib/templates/index';
import { useState, useEffect, useCallback } from 'react';

const myResumeData: ClassicResumeData = {
  heading: {
    name: 'John Doe',
    phone: '+1 (123) 456 7890',
    email: 'jhonny@sins.com',
    portfolio: 'https://johndoe.com',
    github: 'github.com/shubhamku044/la-resume',
    linkedin: 'linkedin.com/in/johndoe',
    leetcode: 'leetcode.com/johndoe',
    codeforces: 'codeforces.com/johndoe',
    location: 'Sonagachi, Kolkata, India',
  },
  education: [
    {
      institution: 'Massachusetts Institute of Technology',
      location: 'Cambridge, MA, USA',
      degree: 'Bachelor of Science in Computer Science',
      duration: {
        from: 'Sep. 2018',
        to: 'May 2022',
      },
      cgpa: '3.8/4.0',
    },
    {
      institution: 'Central High School',
      location: 'Springfield, IL, USA',
      degree: 'High School Diploma',
      duration: {
        from: 'Aug. 2014',
        to: 'May 2018',
      },
      percentage: '92.5',
    },
    {
      institution: 'Stanford University',
      location: 'Stanford, CA, USA',
      degree: 'Master of Science in Artificial Intelligence',
      duration: {
        from: 'Sep. 2022',
        to: 'June 2024',
      },
      cgpa: '3.9/4.0',
    },
  ],
  skills: {
    'Programming skills': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#'],
    'databases': ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
    'frameworks': ['React', 'Node.js', 'Express.js', 'Django', 'Spring Boot'],
    'developerTools': ['Git', 'Docker', 'Webpack', 'VS Code', 'Jenkins'],
  },
  experience: [
    {
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
      title: 'Pyccel',
      date: 'Jan 2024',
      accomplishments: [
        'Added support for \\texttt{numpy.max} and \\texttt{numpy.min} in the C printer, including macro definitions, AST updates, and Fortran support for complex numbers.',
        'Resolved issue \\#1645 by replacing deprecated AST classes with \\texttt{Constant} (Python 3.8+), ensuring compatibility with newer Python versions.',
      ],
    },
    {
      title: 'TechCorp - Software Engineer Intern',
      date: 'May 2023 -- Aug 2023',
      accomplishments: [
        'Developed a RESTful API using Node.js, reducing server response time by 30%.',
        'Collaborated with a team of 5 to implement CI/CD pipelines using Jenkins and Docker.',
        'Optimized database queries in PostgreSQL, improving data retrieval speed by 25%.',
      ],
    },
  ],
  projects: [
    {
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
  honorsAndAwards: [
    {
      description: 'Achieved a 2123 rating (Knight) and ranked in the top 1.5% of LeetCode users',
      url: 'https://leetcode.com/johndoe',
      urlLabel: 'Profile',
    },
    {
      description: 'Solved 2000+ DSA problems across all platforms',
    },
    {
      description:
        'Selected for Amazon Machine Learning Summer School 2024 among top 5% of applicants',
      url: 'https://aws.amazon.com/education/ml-summer-school',
      urlLabel: 'Certificate',
    },
    {
      description: 'Qualified for Round 2 in Meta Hacker Cup 2024, placing in top 10%',
      url: 'https://www.facebook.com/codingcompetitions/hacker-cup/2024',
    },
    {
      description: 'Won regional coding competition, beating 95% of participants',
    },
  ],
};

interface IProps {
  setLatexData: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdate: (imageUrl: string) => void;
}

const ResumeForm = ({ onUpdate, setLatexData }: IProps) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const generateResumePreview = useCallback(async () => {
    setLoading(true);

    try {
      const latexText = classic(myResumeData);

      setLatexData(latexText);

      // debugger;
      const latexBlob = new Blob([latexText], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('latex', latexBlob, 'resume.tex');

      const response = await fetch('/api/compile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate resume preview');

      // Convert the response to a WebP image URL
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      onUpdate(imageUrl); // Pass WebP URL to parent
    } catch (error) {
      console.error('Error generating resume preview:', error);
    } finally {
      setLoading(false);
    }
  }, [onUpdate, setLatexData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name.trim()) {
        generateResumePreview();
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeout);
  }, [name, generateResumePreview]);

  return (
    <div className="rounded-md border p-4">
      <label className="block text-sm font-medium">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="mt-2 w-full rounded-md border p-2"
      />
      {loading && <p className="mt-2 text-sm text-gray-500">Generating preview...</p>}
    </div>
  );
};

export default ResumeForm;
