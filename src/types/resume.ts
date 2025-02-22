export type ResumeData = {
  name: string;
  email: string;
  phone: string;
  experience: {
    position: string;
    company: string;
    duration: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  skills: string[];
};

export type ResumeData2 = {
  name: string;
  email: string;
  phone: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
  codeforces?: string;
  location: string;

  education: {
    institution: string;
    location: string;
    degree: string;
    cgpa?: string;
    percentage?: string;
    startDate: string;
    endDate: string;
  }[];

  skills: {
    languages: string[];
    databases: string[];
    frameworks: string[];
    tools: string[];
  };

  experience: {
    position: string;
    company: string;
    location: string;
    duration: string;
    details: string[];
  }[];

  projects: {
    name: string;
    link?: string;
    details: string[];
  }[];

  awards: string[];
};
