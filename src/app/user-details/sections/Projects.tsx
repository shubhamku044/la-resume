import ProjectsInput from '@/components/ui/detail-inputs/ProjectsInput'
import { UserDetails } from '@/types/userDetails'

interface ProjectsSectionProps {
  userDetails: UserDetails
  setUserDetails: (details: UserDetails) => void
}

export default function ProjectsSection({ userDetails, setUserDetails }: ProjectsSectionProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Projects</h2>
      <ProjectsInput
        projects={userDetails.projects || []}
        onChange={(value) => setUserDetails({ ...userDetails, projects: value })}
      />
    </div>
  )
}
