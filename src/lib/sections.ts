import { Briefcase, Book, Award, Code, User, Layers } from 'lucide-react'

export const userDetailSections = [
  { key: 'personal', label: 'Personal Info', icon: User }, // ✅ Includes Contact, Summary, Languages, Interests, Social Links
  { key: 'skills', label: 'Skills', icon: Code },
  { key: 'education', label: 'Education', icon: Book },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'accomplishments', label: 'Accomplishments & Certifications', icon: Award },
  { key: 'projects', label: 'Projects', icon: Layers },
]

export const userDetailLabels: Record<string, string> = {
  personal:
    'Full Name, Date of Birth, Contact Details, Summary, Languages, Interests, Social Links', // ✅ Updated
  skills: 'Technical & soft skills',
  education: 'Degrees, schools, GPA',
  experience: 'Work history & responsibilities',
  accomplishments: 'Key achievements & certifications',
  projects: 'Notable projects & links',
}
