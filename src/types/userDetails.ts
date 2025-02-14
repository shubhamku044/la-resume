export type UserDetails = {
  personalInfo: PersonalInfo // ✅ Grouped personal info
  skills?: string[] // ✅ Array of skills
  education?: Education[] // ✅ Array of education records
  experience?: Experience[] // ✅ Array of work experiences
  accomplishments?: string[]
  certifications?: Certification[] // ✅ List of certifications
  projects?: Project[] // ✅ List of projects
}

// ✅ New Type for Personal Info
export type PersonalInfo = {
  fullName: string
  email: string
  phone: string
  dob?: string
  address?: string
  summary?: string
  linkedin?: string
  github?: string
  portfolio?: string // ✅ Personal portfolio website
  twitter?: string // ✅ Twitter handle
  languages?: string[] // ✅ Array of languages
  interests?: string[] // ✅ Array of interests
}

// ✅ Education Type
export type Education = {
  school: string
  degree: string // ✅ Degree or course name
  fieldOfStudy: string // ✅ Major or specialization
  startYear: number
  endYear: number
  location: string
} & (
  | { gpa: number; percentage?: never } // If GPA is provided, percentage must not exist
  | { percentage: number; gpa?: never } // If percentage is provided, GPA must not exist
)

// ✅ Experience Type
export type Experience = {
  company: string
  role: string
  startDate: string
  endDate?: string // Nullable for current jobs
  responsibilities: string[]
  location: string
}

// ✅ Certification Type
export type Certification = {
  title: string
  provider: string
  date: string // Date of completion
  credentialUrl?: string // URL to verify certification
}

// ✅ Project Type
export type Project = {
  title: string
  description: string
  technologies: string[]
  link?: string // Optional project link
}
