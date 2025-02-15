import EducationInput from '@/components/ui/detail-inputs/EducationInput'
import { UserDetails } from '@/types/userDetails'

interface EducationSectionProps {
  userDetails: UserDetails
  setUserDetails: (details: UserDetails) => void
}

export default function EducationSection({ userDetails, setUserDetails }: EducationSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Education</h2>
      <EducationInput
        education={userDetails.education || []}
        onChange={(value) => setUserDetails({ ...userDetails, education: value })}
      />
    </div>
  )
}
