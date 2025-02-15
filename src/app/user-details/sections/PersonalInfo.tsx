import PersonalInfoInput from '@/components/ui/detail-inputs/PersonalInfoInput'
import { UserDetails } from '@/types/userDetails'

interface PersonalInfoSectionProps {
  userDetails: UserDetails
  setUserDetails: (details: UserDetails) => void
}

export default function PersonalInfoSection({
  userDetails,
  setUserDetails,
}: PersonalInfoSectionProps) {
  const handlePersonalInfoChange = (updatedPersonalInfo: Partial<UserDetails['personalInfo']>) => {
    setUserDetails({
      ...userDetails,
      personalInfo: { ...userDetails.personalInfo, ...updatedPersonalInfo },
    })
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Personal Info</h2>
      <PersonalInfoInput
        userDetails={userDetails.personalInfo} // ✅ Pass only personalInfo
        onChange={handlePersonalInfoChange} // ✅ Update only personalInfo
      />
    </div>
  )
}
