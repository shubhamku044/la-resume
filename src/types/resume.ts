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
