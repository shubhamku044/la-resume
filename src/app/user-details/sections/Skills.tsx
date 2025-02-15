import SkillsInput from '@/components/ui/detail-inputs/SkillsInput'
import { UserDetails } from '@/types/userDetails'

interface SkillsSectionProps {
  userDetails: UserDetails
  setUserDetails: (details: UserDetails) => void
}

export default function SkillsSection({ userDetails, setUserDetails }: SkillsSectionProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Skills</h2>
      <SkillsInput
        skills={userDetails.skills || []}
        onChange={(value) => setUserDetails({ ...userDetails, skills: value })}
      />
    </div>
  )
}
