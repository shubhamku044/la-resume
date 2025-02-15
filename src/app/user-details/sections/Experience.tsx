import ExperienceInput from '@/components/ui/detail-inputs/ExperienceInput'
import { UserDetails } from '@/types/userDetails'

interface ExperienceSectionProps {
  userDetails: UserDetails
  setUserDetails: (details: UserDetails) => void
}

export default function ExperienceSection({ userDetails, setUserDetails }: ExperienceSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Work Experience</h2>
      <ExperienceInput
        experience={userDetails.experience || []}
        onChange={(value) => setUserDetails({ ...userDetails, experience: value })}
      />
    </div>
  )
}
