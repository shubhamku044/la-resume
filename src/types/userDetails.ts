export type UserDetails = {
  personalInfo: PersonalInfo;
  skills?: Skills;
  education?: Education[];
  experience?: Experience[];
  accomplishments?: string[];
  certifications?: Certification[];
  projects?: Project[];
};

export type Skills = string[];

export type PersonalInfo = {
  fullName: string;
  title?: string;
  email: string;
  phone: string;
  dob?: string;
  address?: string;
  summary?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
  languages?: string[];
  interests?: string[];
  jobTitle?: string;
};

export enum SelectedSection {
  PERSONAL,
  SKILLS,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  ACCOMPLISHMENTS,
}

export type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  location: string;
} & ({ gpa: number; percentage?: never } | { percentage: number; gpa?: never });

export type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
  location: string;
};

export type Certification = {
  title: string;
  provider: string;
  date: string;
  credentialUrl?: string;
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
};
