import { SelectedSection } from '@/types';
import { Briefcase, Book, Award, Code, User, Layers } from 'lucide-react';

export const userDetailSections = [
  { key: SelectedSection.PERSONAL, label: 'Personal Info', icon: User }, // ✅ Includes Contact, Summary, Languages, Interests, Social Links
  { key: SelectedSection.SKILLS, label: 'Skills', icon: Code },
  { key: SelectedSection.EDUCATION, label: 'Education', icon: Book },
  { key: SelectedSection.EXPERIENCE, label: 'Experience', icon: Briefcase },
  { key: SelectedSection.ACCOMPLISHMENTS, label: 'Accomplishments & Certifications', icon: Award },
  { key: SelectedSection.PROJECTS, label: 'Projects', icon: Layers },
];

export const userDetailLabels: Record<string, string> = {
  personal:
    'Full Name, Date of Birth, Contact Details, Summary, Languages, Interests, Social Links', // ✅ Updated
  skills: 'Technical & soft skills',
  education: 'Degrees, schools, GPA',
  experience: 'Work history & responsibilities',
  accomplishments: 'Key achievements & certifications',
  projects: 'Notable projects & links',
};
