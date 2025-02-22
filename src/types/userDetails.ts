export type UserDetails = {
  personalInfo: PersonalInfo;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
  accomplishments?: string[];
  certifications?: Certification[];
  projects?: Project[];
};

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

// ✅ Education Type
export type Education = {
  school: string;
  degree: string; // ✅ Degree or course name
  fieldOfStudy: string; // ✅ Major or specialization
  startYear: number;
  endYear: number;
  location: string;
} & (
  | { gpa: number; percentage?: never } // If GPA is provided, percentage must not exist
  | { percentage: number; gpa?: never } // If percentage is provided, GPA must not exist
);

// ✅ Experience Type
export type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate?: string; // Nullable for current jobs
  responsibilities: string[];
  location: string;
};

// ✅ Certification Type
export type Certification = {
  title: string;
  provider: string;
  date: string; // Date of completion
  credentialUrl?: string; // URL to verify certification
};

// ✅ Project Type
export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link?: string; // Optional project link
};
