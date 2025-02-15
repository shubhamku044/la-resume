import EducationInput from '@/components/ui/detail-inputs/EducationInput'
import ExperienceInput from '@/components/ui/detail-inputs/ExperienceInput'
import SkillsInput from '@/components/ui/detail-inputs/SkillsInput'
import PersonalInfoInput from '@/components/ui/detail-inputs/PersonalInfoInput'
import AccomplishmentsInput from '@/components/ui/detail-inputs/AccomplishmentsInput'
import ProjectsInput from '@/components/ui/detail-inputs/ProjectsInput'
import { UserDetails } from '@/types/userDetails'

interface DetailSectionProps {
  title: string
  sectionKey: keyof UserDetails
  userDetails: UserDetails
  setUserDetails: (details: UserDetails) => void
}

export default function DetailSection({
  title,
  sectionKey,
  userDetails,
  setUserDetails,
}: DetailSectionProps) {
  const handleUpdate = <K extends keyof UserDetails>(key: K, value: UserDetails[K]) => {
    setUserDetails({ ...userDetails, [key]: value })
  }

  return (
    <div className="w-full p-6">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>

      {sectionKey === 'personalInfo' && (
        <PersonalInfoInput
          userDetails={userDetails.personalInfo} // ✅ Pass only personalInfo
          onChange={(updatedPersonalInfo) =>
            handleUpdate('personalInfo', { ...userDetails.personalInfo, ...updatedPersonalInfo })
          }
        />
      )}

      {sectionKey === 'skills' && (
        <SkillsInput
          skills={userDetails.skills || []}
          onChange={(value) => handleUpdate('skills', value)}
        />
      )}

      {sectionKey === 'education' && (
        <EducationInput
          education={userDetails.education || []}
          onChange={(value) => handleUpdate('education', value)}
        />
      )}

      {sectionKey === 'experience' && (
        <ExperienceInput
          experience={userDetails.experience || []}
          onChange={(value) => handleUpdate('experience', value)}
        />
      )}

      {sectionKey === 'accomplishments' && (
        <AccomplishmentsInput
          accomplishments={userDetails.accomplishments || []}
          certifications={userDetails.certifications || []}
          onAccomplishmentsChange={(value) => handleUpdate('accomplishments', value)}
          onCertificationsChange={(value) => handleUpdate('certifications', value)}
        />
      )}

      {sectionKey === 'projects' && (
        <ProjectsInput
          projects={userDetails.projects || []}
          onChange={(value) => handleUpdate('projects', value)}
        />
      )}
    </div>
  )
}
